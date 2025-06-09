// z/video-carousel.schema.ts
import { z } from "zod";

export const VideoCarouselSchema = z.object({
    youtubeLink: z.string().url("Must be a valid YouTube URL"),
    isActive: z.boolean(),
    position: z.number().int().min(0),
});

export const VideoCarouselUpdateSchema = VideoCarouselSchema.extend({
    id: z.string().min(1, "ID is required"),
});