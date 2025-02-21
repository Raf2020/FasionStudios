import { checkEmailFormat } from "@/shared/functions/global.functions";
import { Booking } from "@/types/booking.types";
import { addBooking } from "./booking.db";

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

export const processBooking = async (
  name: string,
  email: string,
  phone: string,
  danceStyle: string,
  ageGroup: string
) => {
  if (name === "") {
    return {
      success: false,
      error: "Please input the name correctly",
    };
  } else if (!checkEmailFormat(email)) {
    return {
      success: false,
      error: "Please input the email correctly",
    };
  } else if (danceStyle === "") {
    return {
      success: false,
      error: "Please select Dance style",
    };
  } else if (ageGroup === "") {
    return {
      success: false,
      error: "Please select Age group",
    };
  }
  const newBooking: Booking = {
    id: "doc-id",
    name,
    email,
    phone,
    danceStyle,
    ageGroup,
    createdAt: Date.now(),
  };
  const res = await addBooking(newBooking);
  return {
    success: res.success,
    error: "An error occurred. Please try again",
  };
};
