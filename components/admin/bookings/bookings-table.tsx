import { Fragment } from "react";
import { BodyCell, HeaderCell, TableCell } from "../table-cells";
import { Booking } from "@/types/booking.types";

type BookingsTableProps = {
  bookings: Booking[];
  allSelected: boolean;
  onCheckClick: (bookingId: string) => void;
  onSelectClick: () => void;
};

const BookingsTable = ({
  bookings,
  allSelected,
  onCheckClick,
  onSelectClick,
}: BookingsTableProps) => {
  return (
    <div className="grid w-full pt-2 px-2 grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr_1fr] shadow-md">
      <Fragment>
        {/* <HeaderCell label="Select" onClick={onSelectClick} /> */}
        <TableCell>
          <div
            className="flex items-center gap-2 select-none cursor-pointer"
            onClick={onSelectClick}
          >
            <input
              type="checkbox"
              className="cursor-pointer"
              checked={allSelected}
            />
            <p className="text-center text-lg font-bold">Select</p>
          </div>
        </TableCell>
        <HeaderCell left label="Name" />
        <HeaderCell label="Email" />
        <HeaderCell label="phone" />
        <HeaderCell label="Dance Style" />
        <HeaderCell label="Age Group" />
        <HeaderCell label="Booked" />
      </Fragment>
      {bookings.map((booking) => (
        <Fragment key={booking.id}>
          <TableCell>
            <input
              type="checkbox"
              className="cursor-pointer"
              checked={booking.selected}
              onClick={() => onCheckClick(booking.id)}
            />
          </TableCell>
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
