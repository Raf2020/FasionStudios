import PrimaryButton from "@/components/global/elements/primary-button";
import Image from "next/image";

const HomeSubscribeSection = () => {
  return (
    <div className="flex w-full py-24 px-15 items-center">
      <div className="w-full">
        <div className="flex w-full max-w-[540px] flex-col gap-4">
          <p className="text-black text-[52px] leading-[64px]">
            Get Ready, Coín! Fusion Studios is Almost Here!
          </p>
          <p className="text-black text-base leading-[30px]">
            We are excited to announce that Fusion Studios will soon be opening
            its doors in the heart of Coín, Malaga! Nestled in a vibrant
            community, our studio is the perfect place for aspiring dancers of
            all ages to explore their creativity, develop their skills, and make
            lasting friendships.
          </p>
          <PrimaryButton name="Subscribe Now" />
        </div>
      </div>
      <div className="w-full">
        <Image
          className="rounded-tl-4xl rounded-br-4xl"
          src="/images/home/building.svg"
          width={648}
          height={510}
          alt="building"
        />
      </div>
    </div>
  );
};

export default HomeSubscribeSection;
