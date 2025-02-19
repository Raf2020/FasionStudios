"use client";

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
    if (position < lastScrollY) {
      setHeaderShown(true);
    } else {
      setHeaderShown(false);
    }
    setLastScrollY(position);
  };

  return (
    <div
      className="z-20 fixed top-0 left-0 w-full transition-transform duration-300"
      style={{
        transform: headerShown ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="flex w-full py-4 px-15 items-center justify-between">
          <Image
            src="/images/header/logo.svg"
            width={153}
            height={85}
            alt="logo"
          />
          <div className="flex gap-6">
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
        </div>
      </div>
    </div>
  );
};

export default Header;
