"use client";

import { Fragment, useEffect, useState } from "react";
import PrimaryButton from "../global/elements/primary-button";
import Input from "../global/elements/input";
import PhoneInput, { CountryData } from "react-phone-input-2";
import Select from "../global/elements/select";

import "react-phone-input-2/lib/style.css";
import { useAlertStore } from "@/zustand/alert-store";
import { processBooking } from "@/actions/booking/booking.action";
import Image from "next/image";
import { sendEmailForBooking } from "@/actions/email/email.action";
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { AppConfig } from "@/shared/constants/app.const";
import { phoneInputStyle } from "@/shared/constants/style.const";
import { classes } from "@/shared/constants/data.const";

const ageGroups = ["Child", "Teen", "Adult"];

const BookingBox = () => {
  const danceStyles = classes.map((cls) => cls.name);

  const { showAlert } = useAlertStore();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [boxShown, setBoxShown] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [danceStyle, setDanceStyle] = useState<string>("");
  const [ageGroup, setAgeGroup] = useState<string>("");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((res) => {
        setPhone(res.country_calling_code ?? "");
      });
    // BOX SHOWN
    setBoxShown(window.innerWidth >= 640);
  }, []);

  const handleBooking = () => {
    setPending(true);
    processBooking(name, email, phone, danceStyle, ageGroup)
      .then((res) => {
        if (res.success) {
          showAlert("Success", "Your booking has been successfully submitted.");
          sendEmailForBooking(email, name);
          setName("");
          setEmail("");
          setPhone("");
          setDanceStyle("");
          setAgeGroup("");
        } else {
          showAlert("Error", res.error);
        }
      })
      .finally(() => {
        setPending(false);
      });
  };

  const handlePhoneNumberChange = (
    value: string,
    data: CountryData,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => {
    console.log(data, event, formattedValue);
    // setPhoneValidated(
    //   value.indexOf(data.dialCode) === 0 &&
    //     data.format.length === formattedValue.length
    // );
    setPhone(`+${value}`);
  };

  return (
    <Fragment>
      {boxShown ? (
        <div className="fixed left-0 top-0 sm:static flex w-full h-full px-4 sm:px-0 items-center bg-black bg-opacity-50 sm:bg-transparent">
          <div className="flex w-full max-w-[450px] py-6 px-4 sm:py-8 sm:px-6 flex-col gap-6 rounded-4xl bg-[#F1F6FE]">
            <div className="flex w-full flex-col gap-2">
              <Image
                className="sm:hidden self-end"
                src="/images/icons/cancel.svg"
                width={21}
                height={20}
                alt="cancel"
                onClick={() => setBoxShown(false)}
              />
              <p className="text-black text-2xl font-medium leading-tight">
                Join us for free classes and updates on our opening in Coin!
              </p>
            </div>
            <div className="flex w-full flex-col gap-5">
              <Input label="Full Name" value={name} setValue={setName} />
              <Input label="Email Address" value={email} setValue={setEmail} />
              <div className="w-full">
                <p className="pb-2 text-black text-base font-semibold">
                  Phone Number (optional)
                </p>
                <PhoneInput
                  inputStyle={phoneInputStyle}
                  country="us"
                  value={phone}
                  onChange={handlePhoneNumberChange}
                />
              </div>
              <Select
                label="Preferred Dance Styles"
                options={danceStyles}
                value={danceStyle}
                setValue={setDanceStyle}
              />
              <Select
                label="Interested Age Group"
                options={ageGroups}
                value={ageGroup}
                setValue={setAgeGroup}
              />
            </div>
            <ReCAPTCHA
              sitekey={AppConfig.RecaptchaSiteKey!}
              ref={recaptchaRef}
            />
            <PrimaryButton
              name="BOOK MY FREE SPOT"
              fullWidth
              disabled={pending}
              onClick={handleBooking}
            />
          </div>
        </div>
      ) : (
        <div className="sm:hidden fixed left-0 bottom-0 w-full py-2 px-2">
          <PrimaryButton
            name="BOOK MY FREE SPOT"
            fullWidth
            onClick={() => setBoxShown(true)}
          />
        </div>
      )}
    </Fragment>
  );
};

export default BookingBox;
