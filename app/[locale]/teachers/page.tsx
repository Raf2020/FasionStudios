"use client";

import TeacherThumb from "@/components/home/teacher-thumb";
// import { appMetadata } from "@/shared/constants/app.const";
import { teachers } from "@/shared/constants/data.const";
import { useTranslations } from "next-intl";

// export const metadata = {
//   ...appMetadata,
//   description:
//     "Learn from the best at Fusion Studios in Coín, Málaga! Our skilled instructors offer classes in ballet, aerial silks, yoga, Brazilian Jiu-Jitsu, and more. Join our welcoming community and grow with expert guidance.",
// };

const TeachersPage = () => {
  const t = useTranslations("TeacherSection");

  return (
    <div className="w-full px-6 pb-10 sm:px-15 sm:pb-20">
      <div className="w-full pt-28 pb-6 sm:pt-40 sm:pb-10">
        <p className="text-black text-2xl sm:text-[52px] sm:leading-[64px]">
          {t("AllTeachers")}
        </p>
      </div>
      <div className="grid w-full grid-cols-1 sm:grid-cols-3 gap-y-10 gap-x-8">
        {teachers.map((teacher) => (
          <TeacherThumb
            key={teacher.name}
            teacherData={{
              ...teacher,
              name: t(`Teachers.${teacher.name}.Name`),
              profession: t(`Teachers.${teacher.name}.Profession`),
              description: t(`Teachers.${teacher.name}.Description`),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TeachersPage;
