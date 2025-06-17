"use client";

import { useTranslations } from "next-intl";

const HomeAdsSection = () => {
  const t = useTranslations("AdSection");

  return (
    <div className="flex w-full flex-col gap-4 bg-primary-blue">
      <div className="flex w-full flex-col sm:pl-15 sm:flex-row sm:items-center">
        <div className="w-full p-6 sm:p-0">
          <AdDescription
            title={t("Family.Title")}
            description={t("Family.Description")}
          />
        </div>
        <AdImage image="/images/home/ad-2.svg" />
      </div>
      <div className="flex w-full flex-col sm:pr-15 sm:flex-row sm:items-center">
        <AdImage image="/images/home/ad-1.svg" />
        <div className="flex w-full p-6 sm:p-0 justify-end">
          <AdDescription
            title={t("Kid.Title")}
            description={t("Kid.Description")}
          />
        </div>
      </div>
    </div>
  );
};

const AdImage = ({ image }: { image: string }) => (
  <div
    className="w-full h-[420px] sm:h-[754px] rounded-tl-4xl rounded-br-4xl bg-cover bg-center"
    style={{
      backgroundImage: `url("${image}")`,
    }}
  ></div>
);

const AdDescription = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex w-full max-w-[540px] flex-col gap-6">
    <p className="text-black text-5xl font-instrument-serif ">{title}</p>
    <p className="text-black text-lg">{description}</p>
  </div>
);

export default HomeAdsSection;
