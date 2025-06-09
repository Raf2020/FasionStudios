"use client";

import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { getAllVideoItems } from "@/actions/video-carousel/video-carousel.action";
import { VideoCarouselItem } from "@/types/video-carousel";

const extractVideoId = (url: string) => {
    const match = url.match(
        /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
};

const VideoCarouselDisplay = () => {
    const [mainVideoId, setMainVideoId] = useState<string | null>(null);
    const [videoList, setVideoList] = useState<VideoCarouselItem[]>([]);

    useEffect(() => {
        const load = async () => {
            const videos = await getAllVideoItems();
            setVideoList(videos);
            if (videos.length > 0) {
                const firstId = extractVideoId(videos[0].youtubeLink);
                setMainVideoId(firstId);
            }
        };
        load();
    }, []);

    return (
        <div className="w-full mt-12 px-4">
            <div className="max-w-4xl mx-auto">
                {mainVideoId && (
                    <div className="aspect-video mb-6">
                        <YouTube
                            videoId={mainVideoId}
                            className="w-full h-full"
                            opts={{
                                width: "100%",
                                height: "100%",
                                playerVars: { autoplay: 0 },
                            }}
                        />
                    </div>
                )}

                <div className="flex overflow-x-auto gap-3 pb-2 scroll-smooth">
                    {videoList.map((item) => {
                        const vidId = extractVideoId(item.youtubeLink);
                        const isActive = vidId === mainVideoId;

                        return (
                            <button
                                key={item.id}
                                onClick={() => setMainVideoId(vidId)}
                                className={`shrink-0 transition border-2 rounded overflow-hidden ${
                                    isActive ? "border-blue-500" : "border-transparent hover:border-blue-300"
                                }`}
                            >
                                <img
                                    src={`https://img.youtube.com/vi/${vidId}/0.jpg`}
                                    alt="thumbnail"
                                    className="w-28 h-20 object-cover"
                                />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default VideoCarouselDisplay;