import Image from "next/image";
import { ClassData } from "@/types/data.types";

const ClassThumb = ({ classData }: { classData: ClassData }) => {
    return (
        <div className="flex w-full flex-col shadow-md">
            <div className="mb-6 w-full h-[500px] rounded-tl-2xl rounded-br-2xl overflow-hidden relative">
                <Image
                    src={classData.image}
                    alt={classData.name}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    className="rounded-tl-2xl rounded-br-2xl"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    priority={false}
                />
            </div>
            <p className="pb-2 text-black text-xl font-semibold">{classData.name}</p>
            <p className="text-gray-700 text-sm line-clamp-3">
                {classData.description}
            </p>
        </div>
    );
};

export default ClassThumb;