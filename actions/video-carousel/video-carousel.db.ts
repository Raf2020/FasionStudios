"use server";

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    updateDoc,
} from "firebase/firestore";
import db from "@/lib/firestore";
import { VideoCarouselItem } from "@/types/video-carousel";

const normalizeYoutubeLink = (url: string): string => {
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (shortsMatch) {
        return `https://www.youtube.com/watch?v=${shortsMatch[1]}`;
    }
    return url;
};
// CREATE
export const videoCarouselCreate = async (
    item: Omit<VideoCarouselItem, "id">
) => {
    try {
        const now = Date.now();
        const normalizedLink = normalizeYoutubeLink(item.youtubeLink);

        const docRef = await addDoc(collection(db, "video_carousel"), {
            ...item,
            youtubeLink: normalizedLink,
            createdAt: now,
            updatedAt: now,
        });

        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("[DB][CREATE] Error adding video:", error);
        return { success: false };
    }
};

// UPDATE
export const videoCarouselUpdate = async (item: VideoCarouselItem) => {
    try {
        const { id, ...data } = item;
        await updateDoc(doc(db, "video_carousel", id), {
            ...data,
            updatedAt: Date.now(),
        });
        return { success: true };
    } catch (error) {
        console.error("[DB][UPDATE] Error updating video:", error);
        return { success: false };
    }
};

// DELETE
export const videoCarouselDeleteById = async (id: string) => {
    try {
        await deleteDoc(doc(db, "video_carousel", id));
        return { success: true };
    } catch (error) {
        console.error("[DB][DELETE] Error deleting video:", error);
        return { success: false };
    }
};

// GET ALL (sorted by position)
export const videoCarouselGetAll = async (): Promise<VideoCarouselItem[]> => {
    try {
        const snapshot = await getDocs(
            query(collection(db, "video_carousel"), orderBy("position", "asc"))
        );
        return snapshot.docs.map((doc) => ({
            ...(doc.data() as VideoCarouselItem),
            id: doc.id,
        }));
    } catch (error) {
        console.error("[DB][LIST] Error fetching videos:", error);
        return [];
    }
};

// GET ONE
export const videoCarouselGetById = async (
    id: string
): Promise<VideoCarouselItem | undefined> => {
    try {
        const snap = await getDoc(doc(db, "video_carousel", id));
        if (snap.exists()) {
            return { ...(snap.data() as VideoCarouselItem), id };
        }
        return undefined;
    } catch (error) {
        console.error("[DB][GET] Error fetching video:", error);
        return undefined;
    }
};