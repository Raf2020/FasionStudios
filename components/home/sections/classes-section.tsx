"use client";

import PrimaryButton from "@/components/global/elements/primary-button";
import ClassThumb from "../class-thumb";
import { useRouter } from "next/navigation";
import { classes } from "@/shared/constants/data.const";
import SwiperWrapper from "@/components/global/swiper/swiper-wrapper";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import SwiperAutoSlider from "@/components/global/swiper/swiper-auto-slider";

const HomeClassesSection = () => {
  const router = useRouter();
  const [mobileMode, setMobileMode] = useState(false);

  useEffect(() => {
    setMobileMode(window.innerWidth < 640);
  }, []);

  return (
    <div id="classes" className="w-full pb-8 sm:pb-20">
      <div className="w-full pt-8 px-6 sm:pt-20 sm:pb-[350px] sm:px-15 bg-primary-purple">
        <div className="mb-8 sm:mb-20 pb-4 border-b-[1px] border-b-white">
          <p className="text-white text-base font-medium">OUR CLASSES</p>
        </div>
        <div className="flex w-full pb-8 flex-col gap-6 sm:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <p className="max-w-3xl text-white text-2xl sm:text-[52px] sm:leading-[64px]">
            From Jiu-Jitsu to belly dancing, we have something for everyone!
          </p>
          <PrimaryButton
            name="View All"
            onClick={() => router.push("/classes")}
          />
        </div>
      </div>
      <div className="sm:-mt-[250px] w-full pt-8 px-6 sm:pt-0 sm:px-15">
        <SwiperWrapper slidesPerView={mobileMode ? 1 : 4}>
          {classes.map((cls) => (
            <SwiperSlide key={cls.name} className="pb-10">
              <div className="w-full sm:px-4">
                <ClassThumb classData={cls} />
              </div>
            </SwiperSlide>
          ))}
          <SwiperAutoSlider slideCount={mobileMode ? 18 : 15} />
        </SwiperWrapper>
      </div>
    </div>
  );
};

export default HomeClassesSection;
