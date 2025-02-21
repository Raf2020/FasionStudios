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

export const downloadBookingList = (bookings: Booking[]) => {
  const csvHeader = "Name,Email,Phone,Dance Style,Age Group,Booked\n";
  const csvRows = bookings
    .map(
      (booking) =>
        `${booking.name},${booking.email},"${booking.phone}",${
          booking.danceStyle
        },${booking.ageGroup},${new Date(
          booking.createdAt
        ).toLocaleDateString()}`
    )
    .join("\n");
  const csvData = csvHeader + csvRows;

  const blob = new Blob([`\ufeff${csvData}`], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);

  const aTag = document.createElement("a");
  aTag.href = url;
  aTag.download = "booking-list.csv";

  document.body.appendChild(aTag);
  aTag.click();

  document.body.removeChild(aTag);
  URL.revokeObjectURL(url);
};
