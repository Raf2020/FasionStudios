import TeacherThumb from "@/components/home/teacher-thumb";
import { teachers } from "@/shared/constants/data.const";

const TeachersPage = () => {
  return (
    <div className="w-full px-6 pb-10 sm:px-15 sm:pb-20">
      <div className="w-full pt-28 pb-6 sm:pt-40 sm:pb-10">
        <p className="text-black text-2xl sm:text-[52px] sm:leading-[64px]">
          All Teachers
        </p>
      </div>
      <div className="grid w-full grid-cols-1 sm:grid-cols-3 gap-y-10 gap-x-8">
        {teachers.map((teacher) => (
          <TeacherThumb key={teacher.name} teacherData={teacher} />
        ))}
      </div>
    </div>
  );
};

export default TeachersPage;
