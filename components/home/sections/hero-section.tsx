"use client"
import { useTranslations } from "next-intl";
import PrimaryButton from "@/components/global/elements/primary-button";
import { Link, useRouter } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { getAllVideoItems } from "@/actions/video-carousel/video-carousel.action";
import { extractVideoId } from "@/lib/utils";


const HomeHeroSection = () => {
  const router = useRouter();
  const t = useTranslations("HeroSection");
  const [mainVideoId, setMainVideoId] = useState<string | null>(null);
  // Optional: If you want JS-based detection instead of just tailwind classes
  // const isMobile = useIsMobile();

  useEffect(() => {
    const load = async () => {
      const videos = await getAllVideoItems();
      if (videos.length > 0) {
        const firstId = extractVideoId(videos[0].youtubeLink);
        setMainVideoId(firstId);
      }
    };
    load();
  }, []);

  return (
      <div id="home" className="relative w-full">
        <div className="relative flex items-center">
          {/* Desktop Background */}
          <div
              className="hidden sm:block w-full h-[480px] sm:h-[960px] bg-cover bg-center"
              style={{
                backgroundImage: `url("/images/home/hero.svg")`,
              }}
          ></div>

          {/* Mobile YouTube Video */}
          <div className="relative w-full h-screen sm:hidden bg-black overflow-hidden">
            {mainVideoId ? (
                <div className="absolute inset-0 w-full h-full">
                  <iframe
                      src={`https://www.youtube.com/embed/${mainVideoId}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&playlist=${mainVideoId}`}
                      title="Main Video"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="absolute inset-0 w-[177vw] h-full left-1/2 -translate-x-1/2"
                      style={{ minWidth: "100vw", minHeight: "100vh" }}
                  />
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center text-white">Loading…</div>
            )}
          </div>

          {/* Overlay Content */}
          <div className="absolute w-full px-6 sm:px-15">
            <div className="flex w-full max-w-[600px] flex-col gap-2">
              <p className="text-white font-instrument-serif text-3xl sm:text-8xl sm:tracking-[-2.88px] italic">
                {t("GetReadyTo")}
                <span className="text-primary-blue">{t("Move")}</span>
              </p>
              <p className="text-white text-base sm:text-xl leading-normal">
                {t("Description")}
              </p>
              <div className="flex flex-col xs:flex-row items-center gap-4 mt-5">
                <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white border-t border-gray-200 shadow-lg p-2">
                  <Link
                      href="https://appfusionstudios.viday.es/"
                      passHref
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                    <PrimaryButton
                        fullWidth
                        name={t("BookButton")}
                        textClassName="text-black font-semibold text-sm text-center font-semibold"
                        className="py-4 rounded-md bg-primary-blue cursor-pointer hover:bg-primary-blue/90 text-white"
                    />
                  </Link>
                </div>
                <PrimaryButton
                    onClick={() =>
                        (window.location.href =
                            "https://appfusionstudios.viday.es/inicio")
                    }
                    name={t("BookButton")}
                    textClassName="text-black text-sm text-center font-semibold"
                    className="hidden md:block !w-full xs:!w-fit py-4 px-8 rounded-full bg-primary-blue cursor-pointer hover:bg-primary-blue/90"
                />
                <PrimaryButton
                    name={t("UpcomingButton")}
                    onClick={() => router.push("/events")}
                    textClassName="text-black text-sm text-center font-semibold"
                    className="!w-full xs:!w-fit py-4 px-8 rounded-full bg-primary-blue cursor-pointer hover:bg-primary-blue/90"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default HomeHeroSection;