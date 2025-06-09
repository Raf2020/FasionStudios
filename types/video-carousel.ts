export interface VideoCarouselItem {
    id: string;
    youtubeLink: string;
    isActive: boolean;
    position: number;
    createdAt?: number;
    updatedAt?: number;
}