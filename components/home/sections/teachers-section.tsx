"use client";

import TeacherThumb from "../teacher-thumb";
import SwiperWrapper from "@/components/global/swiper/swiper-wrapper";
import SwiperAutoSlider from "@/components/global/swiper/swiper-auto-slider";
import PrimaryButton from "@/components/global/elements/primary-button";
import { teachers } from "@/shared/constants/data.const";
import { SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const HomeTeachersSections = () => {
  const t = useTranslations("TeacherSection");
  const router = useRouter();
  const [mobileMode, setMobileMode] = useState(false);

  useEffect(() => {
    setMobileMode(window.innerWidth < 640);
  }, []);

  return (
    <div className="w-full pb-8 px-6 sm:pb-20 sm:px-15">
      <div className="mb-8 sm:mb-20 pb-4 border-b-[1px] border-b-black">
        <p className="text-black text-base font-medium">{t("OurTeachers")}</p>
      </div>
      <div className="flex w-full pb-8 sm:pb-20 flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="pb-2 text-black text-2xl sm:text-[52px] sm:leading-[72px]">
            {t("MeetTeachers")}
          </p>
          <p className="max-w-xl text-black text-base leading-[30px]">
            {t("Description")}
          </p>
        </div>
        <PrimaryButton
          name={t("ViewAll")}
          onClick={() => router.push("/teachers")}
        />
      </div>
      <SwiperWrapper slidesPerView={mobileMode ? 1 : 3}>
        {teachers.map((teacher) => (
          <SwiperSlide key={teacher.name} className="pb-10">
            <div className="w-full sm:px-6">
              <TeacherThumb
                teacherData={{
                  ...teacher,
                  name: t(`Teachers.${teacher.name}.Name`),
                  profession: t(`Teachers.${teacher.name}.Profession`),
                  description: t(`Teachers.${teacher.name}.Description`),
                }}
              />
            </div>
          </SwiperSlide>
        ))}
        <SwiperAutoSlider slideCount={mobileMode ? 5 : 3} />
      </SwiperWrapper>
    </div>
  );
};

export default HomeTeachersSections;
