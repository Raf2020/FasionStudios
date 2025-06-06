"use client";

// import { Event } from "@/types/event.types";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageElement from "../global/image-element";
import { DefaultHeroImageUrl } from "@/shared/constants/event.const";

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

const EventThumb = ({
  event,
  isPast = false,
  loading = false,
}: {
  event?: Event;
  isPast?: boolean;
  loading?: boolean;
}) => {
  const router = useRouter();

  const [price, paidSpots] = useMemo(() => {
    if (!event) return [0, 0];
    return [
      event.prices.reduce(
        (prev, cur) => (prev > cur.price ? prev : cur.price),
        event.prices[0]?.price ?? 0
      ),
      event.reservations.reduce((total, res) => total + res.paidSpots, 0),
    ];
  }, [event]);

  return (
    <div className="flex w-full flex-col sm:flex-row items-center gap-4 sm:gap-12">
      {/* Image section */}
      <div className="w-full max-w-[460px] h-[180px] sm:h-[284px] rounded-2xl overflow-hidden bg-gray-200">
        {!loading && event && (
          <ImageElement
            className="object-cover w-full h-full"
            imageUrl={
              event.coverImageUrl ? event.coverImageUrl : DefaultHeroImageUrl
            }
            alt={'Event Cover Image'}
          />
        )}
      </div>

      {/* Info section */}
      <div className="w-full sm:flex-1 space-y-2 sm:space-y-4">
        {loading ? (
          <>
            <div className="h-6 w-40 bg-gray-200 rounded-full" />
            <div className="h-6 w-3/4 bg-gray-200 rounded-full" />
            <div className="h-6 w-full bg-gray-200 rounded-md" />
            <div className="h-6 w-full bg-gray-200 rounded-md" />
            <div className="h-10 w-full bg-gray-300 rounded-full mt-4" />
          </>
        ) : (
          event && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <div className="mb-2 w-fit py-1 px-3 rounded-full bg-primary-blue">
                  <p className="text-primary-black text-xs font-medium">
                    {event.availableSpots - paidSpots} Plazas Disponibles
                  </p>
                </div>
                <div className="flex mb-2">
                  <div className="flex w-fit py-1 px-3 items-center gap-2 rounded-full bg-primary-blue">
                    <Image
                      src="/images/icons/calendar.svg"
                      width={10}
                      height={10}
                      alt="calendar"
                    />
                    <p className="text-primary-black text-xs">
                      <span className="font-bold">fecha: </span>
                      <span className="font-medium">
                        {new Date(event.date).toLocaleString("es-ES", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-black text-2xl sm:text-[32px] font-extrabold">
                {event.name}
              </p>
              <p className="text-black text-base line-clamp-4">
                {event.description}
              </p>

              <div className="flex w-full items-center gap-4 mt-4">
                <button
                  className="flex-1 py-2 sm:py-3 border rounded-full text-base font-medium cursor-pointer border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white transition"
                  onClick={() => {
                    const path = isPast
                      ? `past-events/${event.id}`
                      : `events/${event.id}`;
                    router.push(path);
                  }}
                >
                  Reserva tu plaza ahora
                </button>
                <div className="flex items-center text-primary-blue">
                  <p className="text-lg sm:text-2xl font-extrabold">€{price}</p>
                  <p className="text-xs sm:text-sm whitespace-pre">
                    {" "}
                    / por persona
                  </p>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default EventThumb;
