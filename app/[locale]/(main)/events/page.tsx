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

const CustomerEventsPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");

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
                    <h1 className="text-4xl sm:text-5xl font-bold text-cyan-700">Events</h1>
                    <p className="text-gray-600 mt-2">Book your spot for exciting performances and classes</p>
                </div>

                <div className="mt-8 flex justify-center">
                    <Tabs value={filter} onValueChange={(val) => setFilter(val as "upcoming" | "past") }>
                        <TabsList className="bg-cyan-100 border border-cyan-300 rounded-full">
                            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                            <TabsTrigger value="past">Past Events</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                className="bg-white border border-gray-200 overflow-hidden shadow-md"
                            >

                                <ImageElement
                                    imageUrl={event.coverImageUrl || "/placeholder.svg"}
                                    alt={event.name}
                                    width={500}
                                    height={192}
                                    className="w-full h-48 object-cover"
                                    unoptimized
                                />
                                <CardContent className="p-4">
                                    <h3 className="text-xl font-semibold text-cyan-700">{event.name}</h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {new Date(event.date).toLocaleDateString(undefined, {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{event.description}</p>
                                    <Button asChild className="mt-4 bg-cyan-600 hover:bg-cyan-700">
                                        <Link href={event.url} target="_blank">
                                            Buy Tickets
                                        </Link>
                                    </Button>
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