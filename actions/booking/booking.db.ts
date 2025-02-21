import db from "@/lib/firestore";
import { Booking } from "@/types/booking.types";
import { addDoc, collection, getDocs } from "firebase/firestore";

export const addBooking = async (booking: Booking) => {
  try {
    const collectionRef = collection(db, "bookings");
    await addDoc(collectionRef, booking);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

export const getAllBookings = async () => {
  try {
    const collectionRef = collection(db, "bookings");
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Booking)
    );
  } catch (error) {
    return [];
  }
};
