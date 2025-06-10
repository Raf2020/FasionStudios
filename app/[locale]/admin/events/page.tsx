"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import toast, { Toaster } from "react-hot-toast";

import { Event } from "@/types/event.types";
import {processEventCreation, processEventDeletion, processEventUpdate} from "@/actions/event/event.action";
import {getAllEvents} from "@/actions/event/event.db";
import {useLocale} from "next-intl";

const eventSchema = z.object({
    name: z.object({
        en: z.string().min(1, "English name is required"),
        es: z.string().min(1, "Spanish name is required"),
    }),
    description: z.object({
        en: z.string().min(1, "English description is required"),
        es: z.string().min(1, "Spanish description is required"),
    }),
    date: z.string().min(1, "Date is required"),
    price: z
        .number({ invalid_type_error: "Price must be a number" })
        .nonnegative("Price must be positive"),
    url: z.string().url("Invalid URL"),
    active: z.boolean(),
    image: z.any().optional(),
});

type EventFormValues = z.infer<typeof eventSchema>;

const initialValues: EventFormValues = {
    name: { en: "", es: "" },
    description: { en: "", es: "" },
    date: "",
    price: 0,
    url: "",
    active: false,
    image: undefined,
};

const AdminEventPage = () => {
    const locale = useLocale();
    const [events, setEvents] = useState<Event[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    const fetchEvents = async () => {
        const data = await getAllEvents();
        setEvents(data);
    };
    useEffect(() => {
        console.log("[UI] useEffect triggered: fetching events...");
        fetchEvents();
    }, []);

    const openModal = (event?: Event) => {
        if (event) {
            console.log("[UI] Opening modal for editing:", event.id);
        } else {
            console.log("[UI] Opening modal for new event");
        }
        setEditingEvent(event ?? null);
        setIsModalOpen(true);
    };

    const handleDelete = async (event: Event) => {
        console.log("[UI] Delete action triggered for event:", event.id);

        const confirm = window.confirm(`Delete event "${event.name}"?`);
        if (!confirm) {
            console.log("[UI] Delete canceled by user.");
            return;
        }

        const result = await processEventDeletion(event);

        if (result.success) {
            console.log("[UI] Event deleted successfully:", event.id);
            toast.success("Event deleted!");
            fetchEvents();
        } else {
            console.error("[UI] Failed to delete event:", event.id);
            toast.error("Failed to delete event.");
        }
    };

    const handleSubmit = async (values: EventFormValues) => {
        console.log("[UI] Form submitted. Preparing FormData...");
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (typeof value === "object" && value !== null && !(value instanceof File)) {
                Object.entries(value).forEach(([lang, val]) => {
                    formData.append(`${key}.${lang}`, String(val));
                });
            } else if (typeof value === "boolean") {
                formData.append(key, value.toString());
            } else if (typeof value === "number") {
                formData.append(key, value.toString());
            } else if (value !== undefined && value !== null) {
                formData.append(key, value as string | Blob);
            }
        });

        let result;

        if (editingEvent) {
            console.log("[UI] Submitting update for event:", editingEvent.id);
            result = await processEventUpdate(editingEvent, formData);
        } else {
            console.log("[UI] Creating new event...");
            result = await processEventCreation(formData);
        }

        if (result.success) {
            console.log(`[UI] ${editingEvent ? "Update" : "Create"} successful.`);
            toast.success(editingEvent ? "Event updated!" : "Event created!");
            await fetchEvents();
            setIsModalOpen(false);
            setEditingEvent(null);
        } else {
            console.error("[UI] Failed to submit form:", result.errorMessage);
            toast.error(result.errorMessage || "Something went wrong.");
        }
    };

    return (
        <div className="p-6">
            <Toaster/>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Admin Events</h1>
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => openModal()}
                >
                    + Create Event
                </button>
            </div>

            <table className="w-full text-left border border-gray-200">
                <thead className="bg-gray-100">
                <tr>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Price</th>
                    <th className="p-2 border">Active</th>
                    <th className="p-2 border">Actions</th>
                </tr>
                </thead>
                <tbody>
                {events.map((event) => (
                    <tr key={event.id} className="border">
                        <td className="p-2">{event.name[locale]}</td>
                        <td className="p-2">{new Date(event.date).toLocaleDateString()}</td>
                        <td className="p-2">₱{event.price}</td>
                        <td className="p-2">{event.active ? "✅" : "❌"}</td>
                        <td className="p-2 space-x-2">
                            <button
                                className="text-blue-600 hover:underline"
                                onClick={() => openModal(event)}
                            >
                                Edit
                            </button>
                            <button
                                className="text-red-600 hover:underline"
                                onClick={() => handleDelete(event)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                {events.length === 0 && (
                    <tr>
                        <td colSpan={5} className="p-4 text-center text-gray-400">
                            No events available
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-lg relative">
                        <h2 className="text-xl font-semibold mb-4">
                            {editingEvent ? "Edit Event" : "Create Event"}
                        </h2>

                        <Formik
                            initialValues={
                                editingEvent
                                    ? {
                                        ...editingEvent,
                                        name: {
                                            en: editingEvent.name?.en || "",
                                            es: editingEvent.name?.es || "",
                                        },
                                        description: {
                                            en: editingEvent.description?.en || "",
                                            es: editingEvent.description?.es || "",
                                        },
                                        date: new Date(editingEvent.date).toISOString().split("T")[0],
                                        image: undefined,
                                    }
                                    : initialValues
                            }
                            enableReinitialize
                            validationSchema={toFormikValidationSchema(eventSchema)}
                            onSubmit={handleSubmit}
                        >
                            {({setFieldValue}) => (
                                <Form className="space-y-3">
                                    <label className="block font-semibold">Event Name</label>
                                    <Field name="name.en" placeholder="Event Name (EN)"
                                           className="w-full p-2 border rounded"/>
                                    <ErrorMessage name="name.en" component="div" className="text-red-500 text-sm"/>

                                    <Field name="name.es" placeholder="Event Name (ES)"
                                           className="w-full p-2 border rounded mt-2"/>
                                    <ErrorMessage name="name.es" component="div" className="text-red-500 text-sm"/>
                                    <Field
                                        name="date"
                                        type="date"
                                        className="w-full p-2 border rounded"
                                    />
                                    <ErrorMessage name="date" component="div" className="text-red-500 text-sm"/>
                                    <label className="block font-semibold mt-4">Description</label>
                                    <Field
                                        name="description.en"
                                        as="textarea"
                                        placeholder="Description (EN)"
                                        className="w-full p-2 border rounded"
                                    />
                                    <ErrorMessage name="description.en" component="div"
                                                  className="text-red-500 text-sm"/>

                                    <Field
                                        name="description.es"
                                        as="textarea"
                                        placeholder="Description (ES)"
                                        className="w-full p-2 border rounded mt-2"
                                    />
                                    <ErrorMessage name="description.es" component="div"
                                                  className="text-red-500 text-sm"/>
                                    <Field
                                        name="price"
                                        type="number"
                                        className="w-full p-2 border rounded"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setFieldValue("price", parseFloat(e.target.value))
                                        }
                                    />
                                    <ErrorMessage name="price" component="div" className="text-red-500 text-sm"/>

                                    <Field
                                        name="url"
                                        type="text"
                                        placeholder="URL"
                                        className="w-full p-2 border rounded"
                                    />
                                    <ErrorMessage name="url" component="div" className="text-red-500 text-sm"/>

                                    <div className="flex items-center space-x-2">
                                        <Field name="active" type="checkbox" className="w-4 h-4"/>
                                        <label htmlFor="active">Active</label>
                                    </div>

                                    <div>
                                        <input
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setFieldValue("image", e.currentTarget.files?.[0])
                                            }
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="flex justify-end space-x-2 mt-4">
                                        <button
                                            type="button"
                                            className="px-4 py-2 border rounded hover:bg-gray-100"
                                            onClick={() => {
                                                setIsModalOpen(false);
                                                setEditingEvent(null);
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminEventPage;