import {
  addDoc,
  arrayUnion,
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
import { Reservation } from "@/types/reserve.types";

// Basic CRUD
export const addEvent = async (event: Event) => {
  try {
    const collectionRef = collection(db, "events");
    await addDoc(collectionRef, event);
    return { success: true };
  } catch {
    return { success: false };
  }
};

export const updateEvent = async (event: Omit<Event, "reservations">) => {
  try {
    const docRef = doc(db, "events", event.id);
    await updateDoc(docRef, event);
    return { success: true };
  } catch {
    return { success: false };
  }
};

export const deleteEventById = async (eventId: string) => {
  try {
    await deleteDoc(doc(db, "events", eventId));
    return { success: true };
  } catch {
    return { success: false };
  }
};

export const getEventById = async (eventId: string) => {
  try {
    const snap = await getDoc(doc(db, "events", eventId));
    return snap.exists() ? { ...snap.data(), id: eventId } : undefined;
  } catch {
    return undefined;
  }
};

export const getAllEvents = async (type?: "past" | "upcoming") => {
  try {
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
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch {
    return [];
  }
};

export const addEventReservation = async (
  eventId: string,
  reservation: Reservation
) => {
  try {
    await updateDoc(doc(db, "events", eventId), {
      reservations: arrayUnion(reservation),
    });
    return { success: true };
  } catch {
    return { success: false };
  }
};
