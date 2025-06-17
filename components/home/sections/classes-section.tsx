"use client";

import PrimaryButton from "@/components/global/elements/primary-button";
import ClassThumb from "../class-thumb";
import SwiperWrapper from "@/components/global/swiper/swiper-wrapper";
import SwiperAutoSlider from "@/components/global/swiper/swiper-auto-slider";
import { useRouter } from "@/i18n/navigation";
import { classes } from "@/shared/constants/data.const";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { useTranslations } from "next-intl";

const HomeClassesSection = () => {
  const t = useTranslations("ClassSection");
  const router = useRouter();
  const [mobileMode, setMobileMode] = useState(false);

  useEffect(() => {
    setMobileMode(window.innerWidth < 640);
  }, []);

  return (
    <div id="classes" className="w-full pb-8 sm:pb-20">
      <div className="w-full pt-8 px-6 sm:pt-20 sm:pb-[350px] sm:px-15 bg-primary-purple">
        <div className="mb-8 sm:mb-20 pb-4 border-b-[1px] border-b-white">
          <p className="text-white text-base font-medium">{t("OurClasses")}</p>
        </div>
        <div className="flex w-full pb-8 flex-col gap-6 sm:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <p className="max-w-3xl text-white text-2xl sm:text-[52px] sm:leading-[64px]">
            {t("Description")}
          </p>
          <PrimaryButton
            name={t("ViewAll")}
            onClick={() => router.push("/classes")}
          />
        </div>
      </div>

      <div className="sm:-mt-[250px] w-full pt-8 px-6 sm:pt-0 sm:px-15">
          <SwiperWrapper
              slidesPerView={1}
              slidesPerGroup={1}
              spaceBetween={32}
              loop={classes.length > 4}
              navigation={false}
              pagination={{ clickable: true, el: "#custom-swiper-pagination1" }}
              className="py-8"
              scrollbar={false}
              breakpoints={{
                  360: { slidesPerView: 1, slidesPerGroup: 1 },
                  640: { slidesPerView: 2, slidesPerGroup: 2 },
                  1024: { slidesPerView: 4, slidesPerGroup: 4 },
              }}
          >
              {classes.map((cls) => (
                  <SwiperSlide key={cls.name}>
                      <div className="overflow-hidden flex flex-col h-full ">
                          <ClassThumb
                              classData={{
                                  ...cls,
                                  name: t(`Classes.${cls.name}.Name`),
                                  description: t(`Classes.${cls.name}.Description`),
                              }}
                          />
                      </div>
                  </SwiperSlide>
              ))}
          </SwiperWrapper>
          <div className="flex justify-center mt-6" id="custom-swiper-pagination1"></div>
      </div>
    </div>
  );
};

export default HomeClassesSection;
