import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ImageElement from "@/components/global/image-element";
import { Event } from "@/types/event.types";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

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
                        isOpen,
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
    const closeButton = useRef<HTMLButtonElement>(null);
    const opener = useRef<HTMLElement | null>(null);
    const [imageError, setImageError] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => () => {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
    }, [imagePreview]);

    return (
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
                <Dialog.Root open={isOpen} onOpenChange={(open) => {
                    if (!open && !isSubmitting) onClose();
                }}>
                    <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
                        <Dialog.Content
                            aria-describedby={undefined}
                            onPointerDownOutside={(event) => event.preventDefault()}
                            onOpenAutoFocus={(event) => {
                                event.preventDefault();
                                const focused = document.activeElement;
                                opener.current = focused instanceof HTMLElement ? focused : null;
                                closeButton.current?.focus();
                            }}
                            onCloseAutoFocus={(event) => {
                                if (!opener.current?.isConnected) return;
                                event.preventDefault();
                                opener.current.focus();
                            }}
                            onEscapeKeyDown={(event) => {
                                if (isSubmitting) event.preventDefault();
                            }}
                            className="fixed inset-0 z-50 flex min-w-0 flex-col bg-white shadow-xl sm:inset-auto sm:left-1/2 sm:top-1/2 sm:max-h-[calc(100dvh-2rem)] sm:w-[calc(100%-2rem)] sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl"
                        >
                            <header className="flex shrink-0 items-center justify-between gap-4 border-b px-4 py-2 sm:px-6">
                                <Dialog.Title className="text-xl font-semibold">
                                    {editingEvent ? "Edit Event" : "Create Event"}
                                </Dialog.Title>
                                <Dialog.Close asChild>
                                    <button
                                        ref={closeButton}
                                        type="button"
                                        aria-label="Close event form"
                                        disabled={isSubmitting}
                                        className="grid h-11 w-11 place-items-center rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                                    >
                                        <X size={22} aria-hidden="true" />
                                    </button>
                                </Dialog.Close>
                            </header>
                            <Form className="flex min-h-0 flex-1 flex-col">
                                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6">
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div className="min-w-0 space-y-1">
                                            <label htmlFor="event-name-en" className="block font-semibold">Event Name (EN)</label>
                                            <Field
                                                id="event-name-en" name="name.en"
                                                placeholder="Event Name (EN)"
                                                className="min-h-11 min-w-0 w-full rounded-md border p-2 text-base"
                                            />
                                            <ErrorMessage
                                                name="name.en"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>
                                        <div className="min-w-0 space-y-1">
                                            <label htmlFor="event-name-es" className="block font-semibold">Event Name (ES)</label>
                                            <Field
                                                id="event-name-es" name="name.es"
                                                placeholder="Event Name (ES)"
                                                className="min-h-11 min-w-0 w-full rounded-md border p-2 text-base mt-2"
                                            />
                                            <ErrorMessage
                                                name="name.es"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>
                                    </div>
                                    <label htmlFor="event-date" className="block font-semibold">Date</label>
                                    <Field
                                        id="event-date" name="date"
                                        type="date"
                                        className="min-h-11 min-w-0 w-full rounded-md border p-2 text-base"
                                    />
                                    <ErrorMessage
                                        name="date"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                    <div className="grid gap-2 sm:grid-cols-2">
                                        <div className="min-w-0">
                                            <label htmlFor="event-from" className="block font-semibold">Start date (optional)</label>
                                            <Field
                                                id="event-from" name="from"
                                                type="date"
                                                className="min-h-11 min-w-0 w-full rounded-md border p-2 text-base"
                                            />
                                            <ErrorMessage
                                                name="from"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <label htmlFor="event-to" className="block font-semibold">End date (optional)</label>
                                            <Field
                                                id="event-to" name="to"
                                                type="date"
                                                className="min-h-11 min-w-0 w-full rounded-md border p-2 text-base"
                                            />
                                            <ErrorMessage
                                                name="to"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div className="min-w-0 space-y-1">
                                            <label htmlFor="event-description-en" className="block font-semibold">Description (EN)</label>
                                            <Field
                                                id="event-description-en" name="description.en"
                                                as="textarea"
                                                placeholder="Description (EN)"
                                                className="min-h-11 min-w-0 w-full rounded-md border p-2 text-base"
                                            />
                                            <ErrorMessage
                                                name="description.en"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>
                                        <div className="min-w-0 space-y-1">
                                            <label htmlFor="event-description-es" className="block font-semibold">Description (ES)</label>
                                            <Field
                                                id="event-description-es" name="description.es"
                                                as="textarea"
                                                placeholder="Description (ES)"
                                                className="min-h-11 min-w-0 w-full rounded-md border p-2 text-base mt-2"
                                            />
                                            <ErrorMessage
                                                name="description.es"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div className="min-w-0 space-y-1">
                                            <label htmlFor="event-price" className="block font-semibold">Price</label>
                                            <Field
                                                id="event-price" name="price"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                className="min-h-11 min-w-0 w-full rounded-md border p-2 text-base"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    setFieldValue("price", parseFloat(e.target.value))
                                                }
                                            />
                                            <ErrorMessage
                                                name="price"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>
                                        <div className="min-w-0 space-y-1">
                                            <label htmlFor="event-url" className="block font-semibold">URL</label>
                                            <Field
                                                id="event-url" name="url"
                                                type="text"
                                                placeholder="URL"
                                                className="min-h-11 min-w-0 w-full rounded-md border p-2 text-base"
                                            />
                                            <ErrorMessage
                                                name="url"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Field
                                            id="active" name="active"
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

                                    <div className="min-w-0">
                                        <label htmlFor="event-cover" className="block font-semibold">Cover image</label>
                                        <input
                                            id="event-cover" name="image"
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
                                            className="w-full min-w-0 text-base file:mr-2 file:min-h-11"
                                        />
                                        <p id="event-cover-limit" className="text-sm text-gray-600">Cover image up to 5 MB</p>
                                        {imageError && <p role="alert" className="text-sm text-red-600">{imageError}</p>}
                                    </div>
                                </div>
                                <footer className="grid shrink-0 grid-cols-2 gap-3 border-t bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:flex sm:justify-end sm:rounded-b-xl sm:px-6">
                                    <Dialog.Close asChild>
                                        <button
                                            type="button"
                                            disabled={isSubmitting}
                                            className="min-h-11 rounded-md border px-4 hover:bg-gray-100 disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                    </Dialog.Close>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="min-h-11 rounded-md bg-green-700 px-5 font-semibold text-white hover:bg-green-800 disabled:opacity-50"
                                    >
                                        {isSubmitting ? "Saving…" : "Save"}
                                    </button>
                                </footer>
                            </Form>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            )}
        </Formik>
    );
};
export default EventModal;
