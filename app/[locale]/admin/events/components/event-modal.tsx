import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ImageElement from "@/components/global/image-element";
import { Event } from "@/types/event.types";
import Image from "next/image";

const maxCoverBytes = 5_000_000;
const maxUncompressedCoverBytes = 4_000_000;

async function prepareCover(file: File) {
    if (file.size > maxCoverBytes) {
        throw new Error("Choose a cover image of 5 MB or less.");
    }
    if (file.size <= maxUncompressedCoverBytes) return file;

    const bitmap = await createImageBitmap(file);
    try {
        const scale = Math.min(1, 2048 / Math.max(bitmap.width, bitmap.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(bitmap.width * scale));
        canvas.height = Math.max(1, Math.round(bitmap.height * scale));
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Could not resize the cover image.");
        context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

        const blob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob(resolve, "image/webp", 0.85);
        });
        if (!blob || blob.type !== "image/webp" || blob.size > maxUncompressedCoverBytes) {
            throw new Error("Could not shrink the cover image. Choose an image of 4 MB or less.");
        }
        return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: blob.type });
    } finally {
        bitmap.close();
    }
}

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
    onSubmit: (formData: FormData, isEdit: boolean) => Promise<void>;
    editingEvent: Event | null;
    locale: string;
}) => {
    const [imageError, setImageError] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => () => {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
    }, [imagePreview]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-3 sm:p-6">
            <div className="bg-white p-4 sm:p-6 rounded shadow-md w-full max-w-lg max-h-[90dvh] overflow-y-auto relative">
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
                    onSubmit={async (values) => {
                        setImageError("");
                        let image: File | undefined;
                        if (values.image) {
                            try {
                                image = await prepareCover(values.image);
                            } catch (error) {
                                setImageError(values.image.size > maxCoverBytes && error instanceof Error
                                    ? error.message
                                    : "Could not prepare the cover image. Choose an image of 4 MB or less.");
                                return;
                            }
                        }
                        const formData = new FormData();
                        Object.entries({ ...values, image }).forEach(([key, value]) => {
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
                        await onSubmit(formData, Boolean(editingEvent));
                    }}
                >
                    {({ setFieldValue, isSubmitting }) => (
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
                            <div className="grid gap-2 sm:grid-cols-2">
                                <div className="min-w-0">
                                    <label className="block font-semibold">Start date (optional)</label>
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
                                <div className="min-w-0">
                                    <label className="block font-semibold">End date (optional)</label>
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
                                step="0.01"
                                min="0"
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
                                    disabled={isSubmitting}
                                    aria-describedby="event-cover-limit"
                                    onChange={(e) => {
                                        setImageError("");
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
                                <p id="event-cover-limit" className="text-sm text-gray-600">Cover image up to 5 MB</p>
                                {imageError && <p role="alert" className="text-sm text-red-600">{imageError}</p>}
                            </div>

                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    type="button"
                                    disabled={isSubmitting}
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
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    {isSubmitting ? "Saving…" : "Save"}
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