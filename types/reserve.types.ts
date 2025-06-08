export type Reservation = {
  id: string;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  participants: Participant[];
  paidSpots: number;

  date: number;
  eventId: string;
  paymentInfo: PaymentInfo;

  selected?: boolean;
};

export type Participant = {
  name: string;
  age: number;
};

export type PaymentInfo = {
  paymentMethod: PaymentMethod;
  totalPrice: number;
  transactionId: string;
};

export enum PaymentMethod {
  Card = "Card",
}
