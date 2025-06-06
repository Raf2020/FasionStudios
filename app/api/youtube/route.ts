import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser();

const CHANNEL_ID = "@Fusionstudioscoin"; // Replace with Fusion Studios channel ID

export async function GET() {
    try {
        const feed = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`);

        const videos = feed.items.slice(0, 6).map((item) => ({
            title: item.title,
            videoId: item.id?.split(":").pop() ?? "",
            link: item.link,
            published: item.pubDate,
            thumbnail: item.media?.thumbnail?.url || "", // might not always be available
        }));

        return NextResponse.json({ success: true, videos });
    } catch (error) {
        console.error("[YOUTUBE_FEED] Failed to fetch videos:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch YouTube videos" }, { status: 500 });
    }
}