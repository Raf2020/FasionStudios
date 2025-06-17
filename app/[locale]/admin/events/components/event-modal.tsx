import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ImageElement from "@/components/global/image-element";
import { Event } from "@/types/event.types";
import Image from "next/image";

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
    from: z.string().optional(),
    to: z.string().optional(),
});
type EventFormValues = z.infer<typeof eventSchema>;
const initialValues: EventFormValues = {
    name: { en: "", es: "" },
    description: { en: "", es: "" },
    date: "",
    price: 0,
    from: "",
    to: "",
    url: "",
    active: false,
    image: undefined,
};

const EventModal = ({
                        onClose,
                        onSubmit,
                        editingEvent,
                        locale,
                    }: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: FormData, isEdit: boolean) => void;
    editingEvent: Event | null;
    locale: string;
}) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    return (
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
                                from: editingEvent.from ? new Date(editingEvent.from).toISOString().split("T")[0] : "",
                                to: editingEvent.to ? new Date(editingEvent.to).toISOString().split("T")[0] : "",
                            }
                            : initialValues
                    }
                    enableReinitialize
                    validationSchema={toFormikValidationSchema(eventSchema)}
                    onSubmit={(values) => {
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
                        onSubmit(formData, Boolean(editingEvent));
                        setImagePreview(null);
                    }}
                >
                    {({ setFieldValue }) => (
                        <Form className="space-y-1">
                            <label className="block font-semibold">Event Name</label>
                            <Field
                                name="name.en"
                                placeholder="Event Name (EN)"
                                className="w-full p-2 border rounded"
                            />
                            <ErrorMessage
                                name="name.en"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                            <label className="block font-semibold">Event Name (ES)</label>
                            <Field
                                name="name.es"
                                placeholder="Event Name (ES)"
                                className="w-full p-2 border rounded mt-2"
                            />
                            <ErrorMessage
                                name="name.es"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                            <label className="block font-semibold">Date</label>
                            <Field
                                name="date"
                                type="date"
                                className="w-full p-2 border rounded"
                            />
                            <ErrorMessage
                                name="date"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                            <div className="flex gap-2">
                                <div className="w-1/2">
                                    <label className="block font-semibold">FROM</label>
                                    <Field
                                        name="from"
                                        type="date"
                                        className="w-full p-2 border rounded"
                                    />
                                    <ErrorMessage
                                        name="from"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block font-semibold">TO</label>
                                    <Field
                                        name="to"
                                        type="date"
                                        className="w-full p-2 border rounded"
                                    />
                                    <ErrorMessage
                                        name="to"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>
                            </div>
                            <label className="block font-semibold mt-4">Description</label>
                            <Field
                                name="description.en"
                                as="textarea"
                                placeholder="Description (EN)"
                                className="w-full p-2 border rounded"
                            />
                            <ErrorMessage
                                name="description.en"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                            <label className="block font-semibold mt-4">Description (ES)</label>
                            <Field
                                name="description.es"
                                as="textarea"
                                placeholder="Description (ES)"
                                className="w-full p-2 border rounded mt-2"
                            />
                            <ErrorMessage
                                name="description.es"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                            <label className="block font-semibold mt-4">Price</label>
                            <Field
                                name="price"
                                type="number"
                                className="w-full p-2 border rounded"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setFieldValue("price", parseFloat(e.target.value))
                                }
                            />
                            <ErrorMessage
                                name="price"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                            <label className="block font-semibold mt-4">URL</label>
                            <Field
                                name="url"
                                type="text"
                                placeholder="URL"
                                className="w-full p-2 border rounded"
                            />
                            <ErrorMessage
                                name="url"
                                component="div"
                                className="text-red-500 text-sm"
                            />

                            <div className="flex items-center space-x-2">
                                <Field
                                    name="active"
                                    type="checkbox"
                                    className="w-4 h-4"
                                />
                                <label htmlFor="active">Active</label>
                            </div>

                            {(imagePreview ||
                                (editingEvent && editingEvent.coverImageUrl)) && (
                                <div className="mb-2 flex justify-center">
                                    {imagePreview ? (
                                        <Image
                                            height={128}
                                            width={128}
                                            src={imagePreview}
                                            alt="Event preview"
                                            className="w-32 h-32 object-cover rounded border"
                                        />
                                    ) : (
                                        <ImageElement
                                            imageUrl={editingEvent?.coverImageUrl ?? ""}
                                            width={128}
                                            height={128}
                                            alt={editingEvent?.name?.[locale] || "Event Image"}
                                            className="w-32 h-32 object-contain rounded border"
                                            showSkeleton={false}
                                        />
                                    )}
                                </div>
                            )}

                            <div>
                                <input
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.currentTarget.files?.[0];
                                        setFieldValue("image", file);
                                        if (file) {
                                            setImagePreview(URL.createObjectURL(file));
                                        } else {
                                            setImagePreview(null);
                                        }
                                    }}
                                    className="w-full"
                                />
                            </div>

                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 border rounded hover:bg-gray-100"
                                    onClick={() => {
                                        onClose();
                                        setImagePreview(null);
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
    );
};
export default EventModal;