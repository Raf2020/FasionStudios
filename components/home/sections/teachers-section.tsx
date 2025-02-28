"use client";

import { teachers } from "@/shared/constants/data.const";
import TeacherThumb from "../teacher-thumb";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import TeachersSlider from "../teachers-slider";
import { useEffect, useState } from "react";

const HomeTeachersSections = () => {
  const [mobileMode, setMobileMode] = useState(false);

  useEffect(() => {
    setMobileMode(window.innerWidth < 640);
  }, []);

  return (
    <div className="w-full pb-8 px-6 sm:pb-20 sm:px-15">
      <div className="mb-8 sm:mb-20 pb-4 border-b-[1px] border-b-black">
        <p className="text-black text-base font-medium">OUR TEACHERS</p>
      </div>
      <div className="flex pb-8 sm:pb-20 flex-col gap-2">
        <p className="text-black text-2xl sm:text-[52px] sm:leading-[72px]">
          Meet our world class teachers
        </p>
        <p className="max-w-xl text-black text-base leading-[30px]">
          Our passionate teachers come from every corner of the globe, bringing
          their expertise and love for movement to inspire our young dancers.
        </p>
      </div>
      <Swiper
        className="w-full"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={mobileMode ? 1 : 3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true, snapOnRelease: true, hide: true }}
      >
        {teachers.map((teacher) => (
          <SwiperSlide key={teacher.name} className="pb-10">
            <div className="w-full sm:px-6">
              <TeacherThumb teacherData={teacher} />
            </div>
          </SwiperSlide>
        ))}
        <TeachersSlider slideCount={mobileMode ? 5 : 3} />
      </Swiper>
    </div>
  );
};

export default HomeTeachersSections;
