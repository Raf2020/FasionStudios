import { TeacherData } from "@/types/data.types";

const TeacherThumb = ({ teacherData }: { teacherData: TeacherData }) => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div
        className="w-full h-[360px] sm:h-[500px] rounded-tl-2xl rounded-br-2xl bg-cover bg-center"
        style={{
          backgroundImage: `url("${teacherData.image}")`,
        }}
      ></div>
      <div className="w-full">
        <p className="pb-1 text-black text-xl font-semibold">
          {teacherData.name}
        </p>
        <p className="text-neutral-400 text-sm font-medium">
          {teacherData.profession}
        </p>
        <p className="text-black text-xs leading-[20px] text-wrap">
          {teacherData.description}
        </p>
      </div>
    </div>
  );
};

export default TeacherThumb;
