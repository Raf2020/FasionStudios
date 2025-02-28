import { ClassData } from "@/types/data.types";

const ClassThumb = ({ classData }: { classData: ClassData }) => {
  return (
    <div className="flex w-full flex-col">
      <div
        className="mb-6 w-full h-[360px] sm:h-[500px] rounded-tl-2xl rounded-br-2xl bg-cover bg-center"
        style={{
          backgroundImage: `url("${classData.image}")`,
        }}
      ></div>
      <p className="pb-2 text-black text-xl font-semibold">{classData.name}</p>
      <p className="text-gray-700 text-sm line-clamp-3">
        {classData.description}
      </p>
    </div>
  );
};

export default ClassThumb;
