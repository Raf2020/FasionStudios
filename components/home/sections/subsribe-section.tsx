"use client";

import { addSubscriber } from "@/actions/subscribe.action";
import Input from "@/components/global/elements/input";
import PrimaryButton from "@/components/global/elements/primary-button";
import { checkEmailFormat } from "@/shared/functions/global.functions";
import { Subscriber } from "@/types/subscribe.type";
import { useAlertStore } from "@/zustand/alert-store";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import YouTube from "react-youtube";

const HomeSubscribeSection = () => {
  const t = useTranslations("SubscribeSection");
  const { showAlert } = useAlertStore();
  const [pending, setPending] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleSubscribe = () => {
    if (checkEmailFormat(email)) {
      const subscriber: Subscriber = {
        email,
        createdAt: Date.now(),
      };
      setPending(true);
      addSubscriber(subscriber).then((res) => {
        if (res.success) {
          showAlert(
            "Success",
            "You have successfully subscribed to our newsletter."
          );
          setEmail("");
        } else {
          showAlert("Error", "Failed to subscribe. Please try again.");
        }
      });
    } else {
      showAlert("Error", "Invalid email format");
    }
  };

  return (
    <div
      id="about"
      className="flex w-full py-8 px-6 flex-col items-center gap-6 sm:py-24 sm:px-15 sm:flex-row sm:gap-0"
    >
      <div className="w-full pr-6 sm:pr-15">
        <div className="flex w-full flex-col gap-4">
          <p className="text-black text-2xl sm:text-[52px] sm:leading-[64px]">
            {t("Title")}
          </p>
          <p className="text-black text-base leading-[30px]">
            {t("Description")}
          </p>
          <Input placeholder="Email" value={email} setValue={setEmail} />
          <PrimaryButton
            disabled={pending}
            name={t("SubscribeNow")}
            onClick={handleSubscribe}
          />
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="youtube-container">
          <YouTube
            videoId="t_eruZQCZHM"
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 0,
                controls: 1,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeSubscribeSection;
