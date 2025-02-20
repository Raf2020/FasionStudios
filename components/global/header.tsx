"use client";

import { useGlobalStore } from "@/zustand/global-store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "About us", href: "/about" },
  { name: "Classes", href: "/classes" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const { setFooterShown } = useGlobalStore();
  const [headerShown, setHeaderShown] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleScroll = () => {
    const position = window.scrollY;
    // if (position < lastScrollY) {
    //   setHeaderShown(true);
    // } else {
    //   setHeaderShown(false);
    // }
    setHeaderShown(!position);
    setLastScrollY(position);
  };

  return (
    <div
      className="z-10 fixed top-0 left-0 w-full transition-transform duration-200"
      style={{
        transform: headerShown ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="flex w-full py-4 px-6 sm:px-15 items-center justify-between">
          <Image
            className="w-24 sm:w-auto"
            src="/images/header/logo.svg"
            width={153}
            height={85}
            alt="logo"
          />
          <div className="hidden sm:flex gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white text-base font-semibold hover:text-gray-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <Image
            className="w-8 sm:hidden cursor-pointer"
            onClick={() => setFooterShown(true)}
            src="/images/icons/hamburger.svg"
            width={64}
            height={64}
            alt="hamburger"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
