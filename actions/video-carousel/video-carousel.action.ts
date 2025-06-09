"use server";

import {
    videoCarouselCreate,
    videoCarouselUpdate,
    videoCarouselDeleteById,
    videoCarouselGetAll,
    videoCarouselGetById,
} from "@/actions/video-carousel/video-carousel.db";

import {
    VideoCarouselSchema,
    VideoCarouselUpdateSchema,
} from "@/actions/video-carousel/video-carousel.schema";

// ADD
export async function addVideoItem(formData: unknown) {
    const parsed = VideoCarouselSchema.safeParse(formData);
    if (!parsed.success) {
        return { success: false, errors: parsed.error.flatten().fieldErrors };
    }

    return await videoCarouselCreate(parsed.data);
}

// UPDATE
export async function updateVideoItem(formData: unknown) {
    const parsed = VideoCarouselUpdateSchema.safeParse(formData);
    if (!parsed.success) {
        return { success: false, errors: parsed.error.flatten().fieldErrors };
    }

    return await videoCarouselUpdate(parsed.data);
}

// DELETE
export async function deleteVideoItem(id: string) {
    if (!id) return { success: false, error: "Missing ID" };
    return await videoCarouselDeleteById(id);
}

// GET ALL
export async function getAllVideoItems() {
    return await videoCarouselGetAll();
}

// GET ONE
export async function getVideoItemById(id: string) {
    if (!id) return undefined;
    return await videoCarouselGetById(id);
}