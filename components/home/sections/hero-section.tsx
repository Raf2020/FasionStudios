import Image from "next/image";
import BookingBox from "../booking-box";

const HomeHeroSection = () => {
  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <Image
          src="/images/home/hero.svg"
          width={1440}
          height={947}
          alt="hero"
        />
        <div className="absolute w-full px-6 sm:px-15">
          <div className="flex w-full max-w-[600px] flex-col gap-2">
            <p className="text-white text-xl sm:text-8xl italic">
              Get Ready to <span className="text-primary-blue">Move!</span>
            </p>
            <p className="text-white text-sm sm:text-xl leading-normal">
              Join the dance revolution in Coín! Fusion Studios is opening soon,
              featuring a variety of classes from ballet to aerial silks.
              Discover your rhythm with us.
            </p>
          </div>
        </div>
      </div>
      <div className="sm:absolute right-15 bottom-16">
        <BookingBox />
      </div>
    </div>
  );
};

export default HomeHeroSection;
