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
    // Query events, sorted by start date
    const collectionRef = collection(db, "events");
    const baseQuery = query(collectionRef, orderBy("from", "asc"));
    const snapshot = await getDocs(baseQuery);

    // Parse docs into Event objects
    const results = snapshot.docs.map((doc) => ({
      ...(doc.data() as Event),
      id: doc.id,
    }));

    // Get today's midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filtering logic
    const filtered = results.filter((event) => {
      const from = typeof event.from === "number" ? new Date(event.from) : null;
      const to = typeof event.to === "number" ? new Date(event.to) : null;
      if (!type) return true;

      if (type === "upcoming") {
        // Show if: Starts in the future, or happening now (today is between from/to)
        return (
            (from && from >= today) || // Starts later
            (from && to && today >= from && today <= to) // Happening now
        );
      }
      if (type === "past") {
        // Show if: Ended before today
        return to && today > to;
      }
      return true;
    });

    // Always sort by start date
    filtered.sort((a, b) => {
      const aStart = typeof a.from === "number" ? a.from : 0;
      const bStart = typeof b.from === "number" ? b.from : 0;
      return aStart - bStart;
    });

    return filtered;
  } catch (error) {
    console.error("[DB][LIST] Error fetching events:", error);
    return [];
  }
};