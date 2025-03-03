"use client";

import { teachers } from "@/shared/constants/data.const";
import TeacherThumb from "../teacher-thumb";
import { SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import SwiperWrapper from "@/components/global/swiper/swiper-wrapper";
import SwiperAutoSlider from "@/components/global/swiper/swiper-auto-slider";
import PrimaryButton from "@/components/global/elements/primary-button";
import { useRouter } from "next/navigation";

const HomeTeachersSections = () => {
  const router = useRouter();
  const [mobileMode, setMobileMode] = useState(false);

  useEffect(() => {
    setMobileMode(window.innerWidth < 640);
  }, []);

  return (
    <div className="w-full pb-8 px-6 sm:pb-20 sm:px-15">
      <div className="mb-8 sm:mb-20 pb-4 border-b-[1px] border-b-black">
        <p className="text-black text-base font-medium">OUR TEACHERS</p>
      </div>
      <div className="flex w-full pb-8 sm:pb-20 flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="pb-2 text-black text-2xl sm:text-[52px] sm:leading-[72px]">
            Meet our world class teachers
          </p>
          <p className="max-w-xl text-black text-base leading-[30px]">
            Our passionate teachers come from every corner of the globe,
            bringing their expertise and love for movement to inspire our young
            dancers.
          </p>
        </div>
        <PrimaryButton
          name="View All"
          onClick={() => router.push("/teachers")}
        />
      </div>
      <SwiperWrapper slidesPerView={mobileMode ? 1 : 3}>
        {teachers.map((teacher) => (
          <SwiperSlide key={teacher.name} className="pb-10">
            <div className="w-full sm:px-6">
              <TeacherThumb teacherData={teacher} />
            </div>
          </SwiperSlide>
        ))}
        <SwiperAutoSlider slideCount={mobileMode ? 5 : 3} />
      </SwiperWrapper>
    </div>
  );
};

export default HomeTeachersSections;
