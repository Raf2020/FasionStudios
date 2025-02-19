const ClassThumb = ({ name, image }: { name: string; image: string }) => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div
        className="w-full h-[500px] rounded-tl-2xl rounded-br-2xl"
        style={{
          backgroundImage: `url("${image}")`,
        }}
      ></div>
      <p className="text-black text-xl font-semibold">{name}</p>
    </div>
  );
};

export default ClassThumb;
