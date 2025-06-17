"use server"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "@/lib/firestore";
import { Event } from "@/types/event.types";

// Add Event
export const addEvent = async (event: Omit<Event, "id">) => {
  try {
    console.log("[DB][ADD] Creating new event:", event.name);
    const docRef = await addDoc(collection(db, "events"), event);
    console.log("[DB][ADD] Event created with ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("[DB][ADD] Error creating event:", error);
    return { success: false };
  }
};

// Update Event
export const updateEvent = async (event: Event) => {
  try {
    console.log("[DB][UPDATE] Updating event:", event.id);
    const docRef = doc(db, "events", event.id);
    const { id, ...eventData } = event;
    await updateDoc(docRef, eventData);
    console.log("[DB][UPDATE] Event updated successfully:", event.id);
    return { success: true };
  } catch (error) {
    console.error("[DB][UPDATE] Error updating event:", event.id, error);
    return { success: false };
  }
};

// Delete Event
export const deleteEventById = async (eventId: string) => {
  try {
    console.log("[DB][DELETE] Deleting event:", eventId);
    await deleteDoc(doc(db, "events", eventId));
    console.log("[DB][DELETE] Event deleted successfully:", eventId);
    return { success: true };
  } catch (error) {
    console.error("[DB][DELETE] Error deleting event:", eventId, error);
    return { success: false };
  }
};

// Get Single Event
export const getEventById = async (eventId: string): Promise<Event | undefined> => {
  try {
    console.log("[DB][GET] Fetching event by ID:", eventId);
    const snap = await getDoc(doc(db, "events", eventId));
    if (snap.exists()) {
      console.log("[DB][GET] Event found:", eventId);
      return { ...(snap.data() as Event), id: eventId };
    } else {
      console.warn("[DB][GET] Event not found:", eventId);
      return undefined;
    }
  } catch (error) {
    console.error("[DB][GET] Error fetching event:", eventId, error);
    return undefined;
  }
};

// Get All Events
export const getAllEvents = async (type?: "past" | "upcoming"): Promise<Event[]> => {
  try {
    console.log("[DB][LIST] Fetching all events", type ? `with filter: ${type}` : "");
    const now = new Date();
    now.setHours(0,0,0,0); // Start of today for comparison

    const collectionRef = collection(db, "events");
    const baseQuery = query(collectionRef, orderBy("from", "asc")); // order by from (or date fallback below)
    const snapshot = await getDocs(baseQuery);

    const results = snapshot.docs.map((doc) => ({ ...(doc.data() as Event), id: doc.id }));

    // Helper functions
    const getStart = (event: Event) => event.from ?? event.date ?? null;
    const getEnd = (event: Event) => event.to ?? event.date ?? null;

    // Filtering in JS (since Firestore can't do OR queries)
    const filtered = results.filter((event) => {
      const start = getStart(event) ? new Date(getStart(event)!) : null;
      const end = getEnd(event) ? new Date(getEnd(event)!) : null;

      if (!type) return true;
      if (type === "upcoming") {
        // Event ends today or in future, or starts today or in future (if only start)
        return (end && end >= now) || (start && start >= now);
      }
      if (type === "past") {
        // Event ends before today, or starts before today (if only start)
        return (end && end < now) || (start && start < now);
      }
      return true;
    });

    // Sort by start date (from, or date)
    filtered.sort((a, b) => {
      const aStart = getStart(a) ? new Date(getStart(a)!) : new Date(0);
      const bStart = getStart(b) ? new Date(getStart(b)!) : new Date(0);
      return aStart.getTime() - bStart.getTime();
    });

    console.log(`[DB][LIST] Found ${filtered.length} event(s).`);
    return filtered;
  } catch (error) {
    console.error("[DB][LIST] Error fetching events:", error);
    return [];
  }
};