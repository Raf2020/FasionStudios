"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type SelectProps = {
  label: string;
  options: string[];
  value: string;
  setValue: (value: string) => void;
};

const Select = ({ label, options, value, setValue }: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const customSelectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      customSelectRef.current &&
      !customSelectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleSelectClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleOptionClick = (option: string) => {
    setValue(option);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <p className="pb-2 text-black text-base font-semibold">{label}</p>
      <div
        ref={customSelectRef}
        className="relative w-full select-none cursor-pointer"
      >
        <div
          className="flex w-full h-12 px-5 items-center justify-between rounded-lg border border-neutral-200 bg-white"
          onClick={handleSelectClick}
        >
          <p className="text-black text-base font-medium">{value}</p>
          <Image
            src="/images/icons/drop-down.svg"
            width={14}
            height={10}
            alt="drop-down"
          />
        </div>
        {isOpen && (
          <div className="z-20 absolute top-full left-0 w-full border-[1px] border-neutral-200 rounded-lg overflow-hidden bg-white">
            <div className="w-full max-h-[336px] overflow-y-auto">
              {options.map((option) => (
                <div
                  key={option}
                  className="py-3 px-5 hover:bg-gray-100"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
