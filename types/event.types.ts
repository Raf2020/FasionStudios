import { Reservation } from "./reserve.types";

export type Event = {
  id: string;

  location: EventLocation;

  sectionAboutTitle: string;
  date: number;
  name: string;
  subTitle: string;
  summary: string;
  description: string;
  coverImageUrl: string;

  schedules: DaySchedule[];
  scheduleLabel: string;

  sectionFoodTitle: string;
  sectionFoodDescription: string;
  foods: Food[];

  sectionToExpectTitle: string;
  whatToExpect: string;

  videoUrl: string;
  imageUrls: string[];

  sectionToKnowTitle: string;
  thingsToKnows: EventGuide[];

  availableSpots: number;
  prices: EventPrice[];

  reviews: EventReview[];
  reservations: Reservation[];
};

export type EventLocation = {
  lat: number;
  lng: number;
  formattedAddress: string;
};

export type DaySchedule = {
  dayName: string;
  activities: ScheduleActivity[];
};

export type ScheduleActivity = {
  fromTime: string;
  toTime: string;
  activity: string;
};

export type Food = {
  imageUrl: string;
  name: string;
};

export type FoodWithFile = Food & {
  imageFile: File | undefined;
};

export type EventGuide = {
  name: string;
  tips: string[];
};

export type EventPrice = {
  fromAge: number;
  toAge: number;
  price: number;
};

export type EventReview = {
  userImageUrl: string;
  userName: string;
  time: number;
  rate: number;
  feedback: string;
};

export type GalleryImage = {
  file: File | undefined;
  url: string;
};
