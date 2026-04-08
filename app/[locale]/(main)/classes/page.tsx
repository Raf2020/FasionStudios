"use client";

import { useEffect, useState } from "react";
import ClassThumb from "@/components/home/class-thumb";
import { classes as fallbackClasses } from "@/shared/constants/data.const";
import { useTranslations, useLocale } from "next-intl";
import { getAllClasses } from "@/actions/class/class.db";
import { ClassData } from "@/types/data.types";
import { Skeleton } from "@/components/ui/skeleton";

const ClassesPage = () => {
  const t = useTranslations("ClassSection");
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
    <div className="w-full pb-8 sm:pb-20">
      <div className="w-full pt-28 px-6 sm:pt-40 sm:pb-[300px] sm:px-15 bg-primary-purple">
        <div className="w-full pb-8 sm:pb-0">
          <p className="text-white text-2xl sm:text-[52px] sm:leading-[64px]">
            {t("AllClasses")}
          </p>
        </div>
      </div>
      <div className="sm:-mt-[250px] grid w-full pt-8 px-6 sm:pt-0 sm:px-15 grid-cols-1 sm:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex w-full flex-col shadow-md">
                <Skeleton className="mb-6 w-full h-[400px] md:h-[600px] rounded-tl-2xl rounded-br-2xl" />
                <Skeleton className="h-7 w-2/3 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-11/12 mb-1" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))
          : classItems.map((cls) => (
              <ClassThumb key={cls.name} classData={cls} />
            ))}
      </div>
    </div>
  );
};

export default ClassesPage;
