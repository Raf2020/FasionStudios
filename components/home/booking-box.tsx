"use client";

import { useEffect, useState } from "react";
import PrimaryButton from "../global/elements/primary-button";
import Input from "../global/elements/input";
import PhoneInput, { CountryData } from "react-phone-input-2";
import { phoneInputStyle } from "@/shared/constants/app.const";
import Select from "../global/elements/select";

import "react-phone-input-2/lib/style.css";
import { useAlertStore } from "@/zustand/alert-store";
import { checkEmailFormat } from "@/shared/functions/global.functions";
import { addBooking } from "@/actions/booking/booking.action";

const danceStyles = ["Ballet", "Hip Hop", "Jazz", "Contemporary", "Tap"];
const ageGroups = ["Child", "Teen", "Adult"];

const BookingBox = () => {
  const { showAlert } = useAlertStore();
  const [pending, setPending] = useState<boolean>(false);

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
  }, []);

  const handleBooking = () => {
    if (!name || !checkEmailFormat(email) || !danceStyle || !ageGroup) {
      showAlert("Error", "Please fill in all the required fields.");
    } else {
      const newBooking = {
        id: "doc-id",
        name,
        email,
        phone,
        danceStyle,
        ageGroup,
        createdAt: Date.now(),
      };
      setPending(true);
      addBooking(newBooking)
        .then((res) => {
          if (res.success) {
            showAlert(
              "Success",
              "Your booking has been successfully submitted."
            );
            setName("");
            setEmail("");
            setPhone("");
            setDanceStyle("");
            setAgeGroup("");
          } else {
            showAlert("Error", "An error occurred. Please try again.");
          }
        })
        .finally(() => {
          setPending(false);
        });
    }
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
    <div className="flex max-w-[450px] py-8 px-6 flex-col gap-6 rounded-none sm:rounded-4xl bg-[#F1F6FE]">
      <p className="text-black text-2xl font-medium leading-tight">
        Join us for free classes and updates on our opening in Coin!
      </p>
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
      <PrimaryButton
        name="BOOK MY FREE SPOT"
        fullWidth
        disabled={pending}
        onClick={handleBooking}
      />
    </div>
  );
};

export default BookingBox;
