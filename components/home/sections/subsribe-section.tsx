"use client";

import { addSubscriber } from "@/actions/subscribe.action";
import Input from "@/components/global/elements/input";
import PrimaryButton from "@/components/global/elements/primary-button";
import { checkEmailFormat } from "@/shared/functions/global.functions";
import { Subscriber } from "@/types/subscribe.type";
import { useAlertStore } from "@/zustand/alert-store";
import Image from "next/image";
import { useState } from "react";

const HomeSubscribeSection = () => {
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
    <div className="flex w-full py-8 px-6 flex-col items-center gap-6 sm:py-24 sm:px-15 sm:flex-row sm:gap-0">
      <div className="w-full">
        <div className="flex w-full max-w-[540px] flex-col gap-4">
          <p className="text-black text-2xl sm:text-[52px] sm:leading-[64px]">
            Get Ready, Coín! Fusion Studios is Almost Here!
          </p>
          <p className="text-black text-base leading-[30px]">
            We are excited to announce that Fusion Studios will soon be opening
            its doors in the heart of Coín, Malaga! Nestled in a vibrant
            community, our studio is the perfect place for aspiring dancers of
            all ages to explore their creativity, develop their skills, and make
            lasting friendships.
          </p>
          <Input placeholder="Email" value={email} setValue={setEmail} />
          <PrimaryButton
            disabled={pending}
            name="Subscribe Now"
            onClick={handleSubscribe}
          />
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
