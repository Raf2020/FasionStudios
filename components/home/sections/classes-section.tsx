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
    <div className="w-full pb-8 sm:pb-20">
      <div className="w-full pt-8 px-6 sm:pt-20 sm:pb-[350px] sm:px-15 bg-primary-purple">
        <div className="mb-8 sm:mb-20 pb-4 border-b-[1px] border-b-white">
          <p className="text-white text-base font-medium">OUR CLASSES</p>
        </div>
        <div className="flex w-full pb-8 flex-col gap-6 sm:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <p className="max-w-3xl text-white text-2xl sm:text-[52px] sm:leading-[64px]">
            From ballet to belly dancing, we have something for everyone!
          </p>
          <PrimaryButton name="View All" />
        </div>
      </div>
      <div className="sm:-mt-[250px] flex w-full pt-8 px-6 flex-col gap-6 sm:pt-0 sm:px-15 sm:flex-row">
        {classes.map((cls, index) => (
          <ClassThumb key={index} name={cls.name} image={cls.image} />
        ))}
      </div>
    </div>
  );
};

export default HomeClassesSection;
