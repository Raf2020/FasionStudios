"use client";

import { useGlobalStore } from "@/zustand/global-store";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About Us",
    href: "/about",
  },
  {
    name: "Class",
    href: "/class",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Terms",
    href: "/terms",
  },
  {
    name: "Policy",
    href: "/policy",
  },
];

const socialMedias = [
  { name: "Facebook", href: "/facebook" },
  { name: "Instagram", href: "/instagram" },
  { name: "Twitter", href: "/twitter" },
];

const Footer = () => {
  const pathName = usePathname();
  const { footerShown, setFooterShown } = useGlobalStore();
  const [isMobileView, setIsMobileView] = useState<boolean>(true);

  const footerHidden = useMemo(
    () => pathName.startsWith("/admin") || pathName.startsWith("/auth"),
    [pathName]
  );

  useEffect(() => {
    setIsMobileView(window.innerWidth < 640);
  }, []);

  return (
    <div
      id="contact"
      className="z-10 fixed top-0 w-full h-full pt-8 px-6 sm:static sm:h-fit sm:pt-20 sm:px-15 bg-[#1E2662] transition-transform duration-200"
      style={{
        display: footerHidden ? "none" : "block",
        transform:
          !isMobileView || footerShown ? "translateX(0)" : "translateX(100%)",
      }}
    >
      <Image
        className="fixed top-7 right-6 w-8 sm:hidden cursor-pointer"
        onClick={() => setFooterShown(false)}
        src="/images/icons/hamburger.svg"
        width={64}
        height={64}
        alt="hamburger"
      />
      <div className="flex w-full px-0 pb-6 flex-col gap-8 sm:px-20 sm:pb-20 sm:flex-row sm:gap-0 sm:justify-between">
        <Image
          className="w-48 sm:w-auto"
          src="/images/footer/logo.svg"
          width={284}
          height={158}
          alt="logo"
        />
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-28 text-[#9A9A9A]">
          <div>
            <p className="pb-4 text-white text-sm font-medium">CONTACT</p>
            <p className="pb-2 text-base leading-[30px]">
              Fusion Studios, C.
              <br />
              Arquimedes 42, Coín, Malaga
            </p>
            <p className="text-base">Email: fusionstudios@gmail.com</p>
          </div>
          <div>
            <p className="pb-4 text-white text-sm font-medium">MENU</p>
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <p key={item.name} className="text-sm leading-[30px]">
                  {item.name}
                </p>
              ))}
            </div>
          </div>
          <div>
            <p className="pb-4 text-white text-sm font-medium">SOCIAL MEDIA</p>
            <div className="flex flex-col gap-2">
              {socialMedias.map((item) => (
                <p key={item.name} className="text-sm leading-[30px]">
                  {item.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-white"></div>
      <div className="w-full py-6">
        <p className="w-full text-center text-white text-sm">
          © 2025 Fusion Studios. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
