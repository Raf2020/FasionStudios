"use client";

import React, { useEffect, useState } from "react";
import { Event } from "@/types/event.types";
import Link from "next/link";
import { getAllEvents } from "@/actions/event/event.db";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import ImageElement from "@/components/global/image-element";
import {useLocale, useTranslations} from "next-intl";

const CustomerEventsPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
    const t = useTranslations("EventsPage");
    const locale = useLocale();
    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const result = await getAllEvents(filter);
            setEvents(result);
            setLoading(false);
        };
        fetch();
    }, [filter]);

    return (
        <div className="min-h-screen bg-white text-black px-4 sm:px-8 py-10 mt-20 flex-col flex items-center">
            <div className={'container px-4 sm:px-6 lg:px-8 py-10'}>
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-cyan-700">{t("Title")}</h1>
                    <p className="text-gray-600 mt-2">{t("Description")}</p>
                </div>

                <div className="mt-8 flex justify-center">
                    <Tabs value={filter} onValueChange={(val) => setFilter(val as "upcoming" | "past") }>
                        <TabsList className="bg-cyan-100 border border-cyan-300 rounded-full">
                            <TabsTrigger value="upcoming">{t("UpcomingEvents")}</TabsTrigger>
                            <TabsTrigger value="past">{t("PastEvents")}</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, idx) => (
                            <Card key={idx} className="border border-gray-200 shadow-sm">
                                <Skeleton className="w-full h-48" />
                                <CardContent className="p-4 space-y-3">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                    <Skeleton className="h-10 w-32 mt-2" />
                                </CardContent>
                            </Card>
                        ))
                    ) : events.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500">No events to display.</div>
                    ) : (
                        events.map((event) => (
                            <Card
                                key={event.id}
                                className="bg-white border border-gray-200 shadow-sm flex flex-col md:flex-row overflow-hidden"
                            >
                                {/* Image */}
                                <div className="w-full md:w-1/2 h-60 md:h-auto">
                                    <ImageElement
                                        imageUrl={event.coverImageUrl || "/placeholder.svg"}
                                        alt={event.name[locale]}
                                        width={600}
                                        height={300}
                                        className="w-full h-full object-cover"
                                        unoptimized
                                    />
                                </div>

                                {/* Content */}
                                <CardContent className="p-4 flex flex-col justify-between w-full">
                                    {/* Availability + Date */}
                                    <div className="flex flex-wrap gap-2 text-sm mb-2">
                                        {/* Placeholder availability */}
                                        <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full font-semibold">
            22 {t("AvailableSpots")}
          </span>
                                        <span className="text-gray-700 font-medium">
            📅 {t("date")}:{" "}
                                            {new Date(event.date).toLocaleDateString(locale, {
                                                weekday: "long",
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
          </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-cyan-800">{event.name[locale]}</h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                                        {event.description[locale]}
                                    </p>

                                    {/* CTA + Price */}
                                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                        <Button
                                            asChild
                                            className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white rounded-full px-6 py-2"
                                        >
                                            <Link href={event.url} target="_blank">
                                                {t("ReserveYourSpot")}
                                            </Link>
                                        </Button>

                                        <span className="text-cyan-800 font-semibold text-lg sm:text-right">
            €{event.price}{" "}
                                            <span className="text-sm font-normal text-gray-500">
              / {t("perPerson")}
            </span>
          </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerEventsPage;