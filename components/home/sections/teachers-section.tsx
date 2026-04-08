"use client";

import { useEffect, useState } from "react";
import TeacherThumb from "../teacher-thumb";
import SwiperWrapper from "@/components/global/swiper/swiper-wrapper";
import PrimaryButton from "@/components/global/elements/primary-button";
import { teachers as fallbackTeachers } from "@/shared/constants/data.const";
import { SwiperSlide } from "swiper/react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { getAllTeachers } from "@/actions/teacher/teacher.db";
import { TeacherData } from "@/types/data.types";
import { Skeleton } from "@/components/ui/skeleton";

const HomeTeachersSections = () => {
  const t = useTranslations("TeacherSection");
  const router = useRouter();
  const locale = useLocale();
  const [teacherItems, setTeacherItems] = useState<TeacherData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllTeachers()
      .then((firebaseTeachers) => {
        if (firebaseTeachers.length > 0) {
          setTeacherItems(
            firebaseTeachers.map((teacher) => ({
              name: teacher.name[locale] ?? teacher.name["en"],
              profession: teacher.profession[locale] ?? teacher.profession["en"],
              description: teacher.description[locale] ?? teacher.description["en"],
              image: teacher.image,
            }))
          );
        } else {
          setTeacherItems(
            fallbackTeachers.map((teacher) => ({
              ...teacher,
              name: t(`Teachers.${teacher.name}.Name`),
              profession: t(`Teachers.${teacher.name}.Profession`),
              description: t(`Teachers.${teacher.name}.Description`),
            }))
          );
        }
      })
      .catch(() => {
        setTeacherItems(
          fallbackTeachers.map((teacher) => ({
            ...teacher,
            name: t(`Teachers.${teacher.name}.Name`),
            profession: t(`Teachers.${teacher.name}.Profession`),
            description: t(`Teachers.${teacher.name}.Description`),
          }))
        );
      })
      .finally(() => setIsLoading(false));
  }, [locale, t]);

  return (
    <div className="w-full pb-8 px-6 sm:pb-20 sm:px-15">
      <div className="mb-8 sm:mb-20 pb-4 border-b-[1px] border-b-black">
        <p className="text-black text-base font-medium">{t("OurTeachers")}</p>
      </div>
      <div className="flex w-full pb-8 sm:pb-20 flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="pb-2 text-black text-2xl sm:text-[52px] sm:leading-[72px] font-instrument-serif">
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

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex w-full flex-col gap-6">
              {/* mirrors: h-[400px] md:h-[600px] rounded-tl-2xl rounded-br-2xl */}
              <Skeleton className="w-full h-[400px] md:h-[600px] rounded-tl-2xl rounded-br-2xl" />
              <div className="w-full">
                {/* mirrors: pb-1 text-xl font-semibold */}
                <Skeleton className="h-7 w-1/2 mb-2" />
                {/* mirrors: text-sm font-medium text-neutral-400 */}
                <Skeleton className="h-4 w-2/3 mb-3" />
                {/* mirrors: text-xs leading-[20px] — 3 lines */}
                <Skeleton className="h-3 w-full mb-1" />
                <Skeleton className="h-3 w-11/12 mb-1" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <SwiperWrapper
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={32}
            loop={teacherItems.length > 3}
            navigation={false}
            pagination={{ clickable: true, el: "#custom-swiper-pagination2" }}
            className="py-8"
            scrollbar={false}
            breakpoints={{
              360: { slidesPerView: 1, slidesPerGroup: 1 },
              640: { slidesPerView: 2, slidesPerGroup: 2 },
              1024: { slidesPerView: 3, slidesPerGroup: 3 },
            }}
          >
            {teacherItems.map((teacher) => (
              <SwiperSlide key={teacher.name}>
                <div className="w-full">
                  <TeacherThumb teacherData={teacher} />
                </div>
              </SwiperSlide>
            ))}
          </SwiperWrapper>
          <div className="flex justify-center mt-6" id="custom-swiper-pagination2"></div>
        </>
      )}
    </div>
  );
};

export default HomeTeachersSections;
