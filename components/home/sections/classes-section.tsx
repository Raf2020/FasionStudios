"use client";

import { useEffect, useState } from "react";
import PrimaryButton from "@/components/global/elements/primary-button";
import ClassThumb from "../class-thumb";
import SwiperWrapper from "@/components/global/swiper/swiper-wrapper";
import { useRouter } from "@/i18n/navigation";
import { classes as fallbackClasses } from "@/shared/constants/data.const";
import { SwiperSlide } from "swiper/react";
import { useTranslations, useLocale } from "next-intl";
import { getAllClasses } from "@/actions/class/class.db";
import { ClassData } from "@/types/data.types";
import { Skeleton } from "@/components/ui/skeleton";

const HomeClassesSection = () => {
  const t = useTranslations("ClassSection");
  const router = useRouter();
  const locale = useLocale();
  const [classItems, setClassItems] = useState<ClassData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllClasses()
      .then((firebaseClasses) => {
        if (firebaseClasses.length > 0) {
          setClassItems(
            firebaseClasses.map((cls) => ({
              name: cls.name[locale] ?? cls.name["en"],
              description: cls.description[locale] ?? cls.description["en"],
              image: cls.image,
            }))
          );
        } else {
          setClassItems(
            fallbackClasses.map((cls) => ({
              ...cls,
              name: t(`Classes.${cls.name}.Name`),
              description: t(`Classes.${cls.name}.Description`),
            }))
          );
        }
      })
      .catch(() => {
        setClassItems(
          fallbackClasses.map((cls) => ({
            ...cls,
            name: t(`Classes.${cls.name}.Name`),
            description: t(`Classes.${cls.name}.Description`),
          }))
        );
      })
      .finally(() => setIsLoading(false));
  }, [locale, t]);

  return (
    <div id="classes" className="w-full pb-8 sm:pb-20">
      <div className="w-full pt-8 px-6 sm:pt-20 sm:pb-[350px] sm:px-15 bg-primary-purple">
        <div className="mb-8 sm:mb-20 pb-4 border-b-[1px] border-b-white">
          <p className="text-white text-base font-medium">{t("OurClasses")}</p>
        </div>
        <div className="flex w-full pb-8 flex-col gap-6 sm:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <p className="max-w-3xl text-white text-2xl sm:text-[52px] sm:leading-[64px] font-instrument-serif">
            {t("Description")}
          </p>
          <PrimaryButton
            name={t("ViewAll")}
            onClick={() => router.push("/classes")}
          />
        </div>
      </div>

      <div className="sm:-mt-[250px] w-full pt-8 px-6 sm:pt-0 sm:px-15">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex w-full flex-col shadow-md">
                {/* mirrors: mb-6 w-full h-[400px] md:h-[600px] rounded-tl-2xl rounded-br-2xl */}
                <Skeleton className="mb-6 w-full h-[400px] md:h-[600px] rounded-tl-2xl rounded-br-2xl" />
                {/* mirrors: pb-2 text-xl font-semibold */}
                <Skeleton className="h-7 w-2/3 mb-2" />
                {/* mirrors: text-sm line-clamp-3 — 3 lines */}
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-11/12 mb-1" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <SwiperWrapper
              slidesPerView={1}
              slidesPerGroup={1}
              spaceBetween={32}
              loop={classItems.length > 4}
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
              {classItems.map((cls) => (
                <SwiperSlide key={cls.name}>
                  <div className="overflow-hidden flex flex-col h-full">
                    <ClassThumb classData={cls} />
                  </div>
                </SwiperSlide>
              ))}
            </SwiperWrapper>
            <div className="flex justify-center mt-6" id="custom-swiper-pagination1"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeClassesSection;
