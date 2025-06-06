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
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const collectionRef = collection(db, "events");

    const baseQuery =
        type === "past"
            ? query(
                collectionRef,
                where("date", "<", now - oneDay),
                orderBy("date", "asc")
            )
            : type === "upcoming"
                ? query(
                    collectionRef,
                    where("date", ">=", now - oneDay),
                    orderBy("date", "asc")
                )
                : query(collectionRef, orderBy("date", "asc"));

    const snapshot = await getDocs(baseQuery);
    const results = snapshot.docs.map((doc) => ({ ...(doc.data() as Event), id: doc.id }));

    console.log(`[DB][LIST] Found ${results.length} event(s).`);
    return results;
  } catch (error) {
    console.error("[DB][LIST] Error fetching events:", error);
    return [];
  }
};