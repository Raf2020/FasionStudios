type TeacherThumbProps = {
  name: string;
  profession: string;
  description: string;
  image: string;
};

const TeacherThumb = ({
  name,
  profession,
  description,
  image,
}: TeacherThumbProps) => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div
        className="w-full h-[360px] sm:h-[500px] rounded-tl-2xl rounded-br-2xl bg-cover bg-center"
        style={{
          backgroundImage: `url("${image}")`,
        }}
      ></div>
      <div className="w-full">
        <p className="pb-1 text-black text-xl font-semibold">{name}</p>
        <p className="text-neutral-400 text-sm font-medium">{profession}</p>
        <p className="text-black text-xs leading-[20px] text-wrap">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TeacherThumb;
