import { Fragment } from "react";
import { BodyCell, HeaderCell } from "../table-cells";
import { Booking } from "@/types/booking.types";

const BookingsTable = ({ bookings }: { bookings: Booking[] }) => {
  return (
    <div className="grid w-full pt-2 px-2 grid-cols-6 shadow-md">
      <Fragment>
        <HeaderCell left label="Name" />
        <HeaderCell label="Email" />
        <HeaderCell label="phone" />
        <HeaderCell label="Dance Style" />
        <HeaderCell label="Age Group" />
        <HeaderCell label="Booked" />
      </Fragment>
      {bookings.map((booking, index) => (
        <Fragment key={index}>
          <BodyCell left label={booking.name} />
          <BodyCell label={booking.email} />
          <BodyCell label={booking.phone} />
          <BodyCell label={booking.danceStyle} />
          <BodyCell label={booking.ageGroup} />
          <BodyCell label={new Date(booking.createdAt).toLocaleDateString()} />
        </Fragment>
      ))}
    </div>
  );
};

export default BookingsTable;
