"use client";

// import Image from "next/image";
import { useTranslations } from "next-intl";
import PrimaryButton from "@/components/global/elements/primary-button";
import { Link, useRouter } from "@/i18n/navigation";

const HomeHeroSection = () => {
  const router = useRouter();
  const t = useTranslations("HeroSection");

  return (
    <div id="home" className="relative w-full">
      <div className="relative flex items-center">
        {/* <Image
          src="/images/home/hero.svg"
          width={1440}
          height={947}
          alt="hero"
        /> */}
        <div
          className="w-full h-[480px] sm:h-[960px] bg-cover bg-center"
          style={{
            backgroundImage: `url("/images/home/hero.svg")`,
          }}
        ></div>
        <div className="absolute w-full px-6 sm:px-15">
          <div className="flex w-full max-w-[600px] flex-col gap-2">
            <p className="text-white font-instrument-serif text-3xl sm:text-8xl sm:tracking-[-2.88px] italic">
              {t("GetReadyTo")}
              <span className="text-primary-blue">{t("Move")}</span>
            </p>
            <p className="text-white text-base sm:text-xl leading-normal">
              {t("Description")}
              {/* Discover your rhythm with us. */}
            </p>
            <div className="flex flex-col xs:flex-row items-center gap-4 mt-5">
              <Link
                href="https://appfusionstudios.viday.es/"
                passHref
                target="_blank"
                rel="noopener noreferrer"
              >
                <PrimaryButton
                  name={t("BookButton")}
                  textClassName="text-black text-sm text-center font-semibold"
                  className="!w-full xs:!w-fit py-4 px-8 rounded-full bg-primary-blue cursor-pointer hover:bg-primary-blue/90"
                />
              </Link>
              <PrimaryButton
                name={t("UpcomingButton")}
                onClick={() => router.push("/events")}
                textClassName="text-black text-sm text-center font-semibold"
                className="!w-full xs:!w-fit py-4 px-8 rounded-full bg-primary-blue cursor-pointer hover:bg-primary-blue/90"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroSection;
