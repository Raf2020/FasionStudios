"use client";

import EventThumb from "@/components/events/event-thumb";
import { useTranslations } from "next-intl";

type Event = {
  id: string;
  name: string;
  description: string;
  date: number;
  coverImageUrl: string;
  imageUrls: string[];
  availableSpots: number;
  prices: {
    price: number;
    label: string;
  }[];
  reservations: {
    paidSpots: number;
  }[];
};

const SAMPLE_EVENTS: Event[] = [
  {
    id: "event-1",
    name: "Bachata Social Night",
    description:
      "An energetic evening of Bachata dancing with DJs and free drinks.",
    date: new Date().getTime() + 86400000, // 1 day from now
    coverImageUrl: "/images/sample-event-1.jpg",
    imageUrls: ["/images/sample-event-1.jpg"],
    availableSpots: 30,
    prices: [
      { price: 10, label: "General" },
      { price: 15, label: "VIP" },
    ],
    reservations: [{ paidSpots: 10 }, { paidSpots: 5 }],
  },
  {
    id: "event-2",
    name: "Salsa Summer Jam",
    description:
      "A night of salsa under the stars. Outdoor venue with food stalls.",
    date: new Date().getTime() + 172800000, // 2 days from now
    coverImageUrl: "/images/sample-event-2.jpg",
    imageUrls: ["/images/sample-event-2.jpg"],
    availableSpots: 50,
    prices: [
      { price: 12, label: "Standard" },
      { price: 18, label: "Premium" },
    ],
    reservations: [{ paidSpots: 20 }],
  },
];

// Static banner data
const STATIC_BANNER_IMAGE = "/images/home/hero.svg";

const EventsPage = () => {
  const t = useTranslations("EventsSection");

  return (
    <div className="w-full">
      <div className="w-full h-[240px] sm:h-[430px] relative overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${STATIC_BANNER_IMAGE}')` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
          <p className="text-white text-2xl sm:text-5xl font-medium">
            {t("BannerTitle")}
          </p>
          <p className="pb-8 text-white text-center text-lg sm:text-xl">
            {t("BannerSubtitle")}
          </p>
        </div>
      </div>

      <div className="flex w-full py-8 px-6 sm:py-24 sm:px-40 flex-col gap-8 sm:gap-12">
        {SAMPLE_EVENTS.map((event) => (
          <EventThumb key={event.id} event={event} loading={false} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
