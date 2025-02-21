export type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  danceStyle: string;
  ageGroup: string;
  createdAt: number;

  selected?: boolean;
};
