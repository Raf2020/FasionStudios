"use client";

import { downloadBookingList } from "@/actions/booking/booking.action";
import { getAllBookings } from "@/actions/booking/booking.db";
import BookingsTable from "@/components/admin/bookings/bookings-table";
import EmailSendDlg from "@/components/admin/global/email-send-dlg";
import PageTitle from "@/components/admin/global/page-title";
import PrimaryButton from "@/components/global/elements/primary-button";
import { Booking } from "@/types/booking.types";
import { useEffect, useState } from "react";

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [emailDlgShown, setEmailDlgShown] = useState<boolean>(false);
  const [selectedBookings, setSelectedBookings] = useState<Booking[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  useEffect(() => {
    getAllBookings().then((_bookings) => {
      setBookings(_bookings);
    });
  }, []);

  useEffect(() => {
    const _selectedBookings = bookings.filter((booking) => booking.selected);
    setSelectedBookings(_selectedBookings);
    setSelectedEmails(_selectedBookings.map((booking) => booking.email));
  }, [bookings]);

  const handleSelectClick = () => {
    const selected = selectedBookings.length !== bookings.length;
    setBookings(bookings.map((booking) => ({ ...booking, selected })));
  };

  const handleCheckClick = (bookingId: string) => {
    const _bookings = [...bookings];
    const _booking = _bookings.find(
      (booking) => booking.id === bookingId
    ) as Booking;
    _booking.selected = !_booking.selected;
    setBookings(_bookings);
  };

  const handleDownload = () => {
    downloadBookingList(selectedBookings.length ? selectedBookings : bookings);
  };

  return (
    <div className="flex w-full flex-col gap-6 bg-white">
      <PageTitle>Bookings</PageTitle>
      <BookingsTable
        bookings={bookings}
        onCheckClick={handleCheckClick}
        onSelectClick={handleSelectClick}
        allSelected={selectedBookings.length === bookings.length}
      />
      <div className="flex gap-6">
        <PrimaryButton
          name="Download List as a sheet"
          lowHeight
          onClick={handleDownload}
        />
        {selectedBookings.length ? (
          <PrimaryButton
            name="Send Email"
            lowHeight
            onClick={() => setEmailDlgShown(true)}
          />
        ) : null}
      </div>
      {/* Dialogs */}
      {emailDlgShown ? (
        <EmailSendDlg
          emails={selectedEmails}
          onComplete={() => setEmailDlgShown(false)}
        />
      ) : null}
    </div>
  );
};

export default BookingsPage;
