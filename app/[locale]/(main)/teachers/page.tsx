"use client";

import { useEffect, useState } from "react";
import TeacherThumb from "@/components/home/teacher-thumb";
import { teachers as fallbackTeachers } from "@/shared/constants/data.const";
import { useTranslations, useLocale } from "next-intl";
import { getAllTeachers } from "@/actions/teacher/teacher.db";
import { TeacherData } from "@/types/data.types";
import { Skeleton } from "@/components/ui/skeleton";

const TeachersPage = () => {
  const t = useTranslations("TeacherSection");
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
    <div className="w-full px-6 pb-10 sm:px-15 sm:pb-20">
      <div className="w-full pt-28 pb-6 sm:pt-40 sm:pb-10">
        <p className="text-black text-2xl sm:text-[52px] sm:leading-[64px]">
          {t("AllTeachers")}
        </p>
      </div>
      <div className="grid w-full grid-cols-1 sm:grid-cols-3 gap-y-10 gap-x-8">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex w-full flex-col gap-6">
                <Skeleton className="w-full h-[400px] md:h-[600px] rounded-tl-2xl rounded-br-2xl" />
                <div className="w-full">
                  <Skeleton className="h-7 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-3" />
                  <Skeleton className="h-3 w-full mb-1" />
                  <Skeleton className="h-3 w-11/12 mb-1" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
              </div>
            ))
          : teacherItems.map((teacher) => (
              <TeacherThumb key={teacher.name} teacherData={teacher} />
            ))}
      </div>
    </div>
  );
};

export default TeachersPage;
