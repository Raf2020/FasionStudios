import PrimaryButton from "@/components/global/elements/primary-button";
import ClassThumb from "../class-thumb";

const HomeClassesSection = () => {
  const classes = [
    {
      name: "Ballet",
      image: "/images/home/class-1.svg",
    },
    {
      name: "Contemporary",
      image: "/images/home/class-2.svg",
    },
    {
      name: "Urban",
      image: "/images/home/class-3.svg",
    },
    {
      name: "Aerial Skills & Hoop",
      image: "/images/home/class-4.svg",
    },
  ];

  return (
    <div className="w-full pb-20">
      <div className="w-full pt-20 pb-[350px] px-15 bg-primary-purple">
        <div className="mb-20 pb-4 border-b-[1px] border-b-white">
          <p className="text-white text-base font-medium">OUR CLASSES</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="max-w-3xl text-white text-[52px] leading-[64px]">
            From ballet to belly dancing, we have something for everyone!
          </p>
          <PrimaryButton name="View All" />
        </div>
      </div>
      <div className="-mt-[250px] flex w-full px-15 gap-6">
        {classes.map((cls, index) => (
          <ClassThumb key={index} name={cls.name} image={cls.image} />
        ))}
      </div>
    </div>
  );
};

export default HomeClassesSection;
