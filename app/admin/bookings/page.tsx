"use client";

import { getAllBookings } from "@/actions/booking/booking.action";
import BookingsTable from "@/components/admin/bookings/bookings-table";
import { Booking } from "@/types/booking.types";
import { useEffect, useState } from "react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    getAllBookings().then((_bookings) => {
      setBookings(_bookings);
    });
  }, []);

  return (
    <div className="w-full bg-white">
      <BookingsTable bookings={bookings} />
    </div>
  );
}
