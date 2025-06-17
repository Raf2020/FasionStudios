import React from "react";
import ImageElement from "@/components/global/image-element";
import { Event } from "@/types/event.types";

const EventTable = ({
                        events,
                        locale,
                        onEdit,
                        onDelete,
                    }: {
    events: Event[];
    locale: string;
    onEdit: (event: Event) => void;
    onDelete: (event: Event) => void;
}) => (
    <table className="w-full text-left border border-gray-200">
        <thead className="bg-gray-100">
        <tr>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">FROM</th>
            <th className="p-2 border">TO</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Active</th>
            <th className="p-2 border">Actions</th>
        </tr>
        </thead>
        <tbody>
        {events.map((event) => (
            <tr key={event.id} className="border">
                <td className="p-2">
                    {event.coverImageUrl ? (
                        <ImageElement
                            height={400}
                            width={400}
                            imageUrl={event.coverImageUrl}
                            alt={event.name[locale]}
                            className="w-14 h-14 object-contain rounded"
                            showSkeleton={false}
                        />
                    ) : (
                        <span className="text-gray-300 italic">No image</span>
                    )}
                </td>
                <td className="p-2">{event.name[locale]}</td>
                <td className="p-2">{new Date(event.date).toLocaleDateString()}</td>
                <td className="p-2">{new Date(event.from).toLocaleDateString()}</td>
                <td className="p-2">{new Date(event.to).toLocaleDateString()}</td>
                <td className="p-2">
                    {new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(event.price)}
                </td>
                <td className="p-2">{event.active ? "✅" : "❌"}</td>
                <td className="p-2 space-x-2">
                    <button
                        className="text-blue-600 hover:underline"
                        onClick={() => onEdit(event)}
                    >
                        Edit
                    </button>
                    <button
                        className="text-red-600 hover:underline"
                        onClick={() => onDelete(event)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ))}
        {events.length === 0 && (
            <tr>
                <td colSpan={6} className="p-4 text-center text-gray-400">
                    No events available
                </td>
            </tr>
        )}
        </tbody>
    </table>
);

export default EventTable;