"use client";

import ClassThumb from "@/components/home/class-thumb";
// import { appMetadata } from "@/shared/constants/app.const";
import { classes } from "@/shared/constants/data.const";
import { useTranslations } from "next-intl";

// export const metadata = {
//   ...appMetadata,
//   description:
//     "Join Fusion Studios in Coín, Málaga, for top-rated dance and fitness classes! Explore ballet, aerial silks, yoga, Brazilian Jiu-Jitsu, and more. Perfect for families, kids, and adults.",
// };

const ClassesPage = () => {
  const t = useTranslations("ClassSection");

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
        {classes.map((cls) => (
          <ClassThumb
            key={cls.name}
            classData={{
              ...cls,
              name: t(`Classes.${cls.name}.Name`),
              description: t(`Classes.${cls.name}.Description`),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ClassesPage;
