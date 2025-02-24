import HomeAdsSection from "@/components/home/sections/ads-section";
import HomeClassesSection from "@/components/home/sections/classes-section";
import HomeHeroSection from "@/components/home/sections/hero-section";
import HomeSubscribeSection from "@/components/home/sections/subsribe-section";
import HomeTeachersSections from "@/components/home/sections/teachers-section";

export default function Home() {
  return (
    <div className="w-full pb-12 sm:pb-0">
      <HomeHeroSection />
      <HomeClassesSection />
      <HomeTeachersSections />
      <HomeAdsSection />
      <HomeSubscribeSection />
    </div>
  );
}
