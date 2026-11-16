"use client";

import React, { useEffect, useState } from "react";
import { Event } from "@/types/event.types";
import {
    processEventCreation,
    processEventDeletion,
    processEventUpdate,
} from "@/actions/event/event.action";
import { getAllEvents } from "@/actions/event/event.db";
import { useLocale } from "next-intl";
import toast, { Toaster } from "react-hot-toast";
import EventTable from "@/app/[locale]/admin/events/components/event-table";
import EventModal from "@/app/[locale]/admin/events/components/event-modal";

const AdminEventPage = () => {
    const locale = useLocale();
    const [events, setEvents] = useState<Event[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    const fetchEvents = async () => {
        const data = await getAllEvents();
        setEvents(data);
    };
    useEffect(() => { fetchEvents(); }, []);

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setIsModalOpen(true);
    };
    const handleDelete = async (event: Event) => {
        const confirm = window.confirm(`Delete event "${event.name[locale]}"?`);
        if (!confirm) return;
        const result = await processEventDeletion(event);
        if (result.success) {
            toast.success("Event deleted!");
            fetchEvents();
        } else {
            toast.error("Failed to delete event.");
        }
    };
    const handleCreate = () => {
        setEditingEvent(null);
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingEvent(null);
    };
    const handleSubmit = async (formData: FormData, isEdit: boolean) => {
        try {
            const result = editingEvent && isEdit
                ? await processEventUpdate(editingEvent, formData)
                : await processEventCreation(formData);

            if (!result.success) {
                toast.error(result.errorMessage || "Unable to save the event.");
                return;
            }

            handleModalClose();
            toast.success(isEdit ? "Event updated!" : "Event created!");
        } catch (error) {
            console.error("Event save request failed:", error);
            toast.error("Unable to save the event. Check the event list before retrying.");
            return;
        }

        try {
            await fetchEvents();
        } catch (error) {
            console.error("Event list refresh failed:", error);
            toast.error("Event saved. Reload the page to refresh the list.");
        }
    };
    return (
        <div className="p-6">
            <Toaster />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Admin Events</h1>
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={handleCreate}
                >
                    + Create Event
                </button>
            </div>
            <EventTable
                events={events}
                locale={locale}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            {isModalOpen && (
                <EventModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onSubmit={handleSubmit}
                    editingEvent={editingEvent}
                    locale={locale}
                />
            )}
        </div>
    );
};

export default AdminEventPage;