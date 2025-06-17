import Image from "next/image";
import { TeacherData } from "@/types/data.types";

const TeacherThumb = ({ teacherData }: { teacherData: TeacherData }) => {
    return (
        <div className="flex w-full flex-col gap-6">
            <div className="w-full h-[600px] rounded-tl-2xl rounded-br-2xl overflow-hidden relative">
                <Image
                    src={teacherData.image}
                    alt={teacherData.name}
                    fill
                    className="object-cover rounded-tl-2xl rounded-br-2xl"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />
            </div>
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