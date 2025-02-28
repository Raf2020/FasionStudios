"use client";

import { useGlobalStore } from "@/zustand/global-store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const menuItems = [
  {
    name: "Home",
    href: "/#home",
  },
  {
    name: "About Us",
    href: "/#about",
  },
  {
    name: "Class",
    href: "/#classes",
  },
  {
    name: "Contact",
    href: "/#contact",
  },
];

const socialMedias = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/fusionstudioscoin/",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/fusionstudioscoin/",
  },
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
        <Link href="/#home" onClick={() => setFooterShown(false)}>
          <Image
            className="w-48 sm:w-auto"
            src="/images/footer/logo.svg"
            width={284}
            height={158}
            alt="logo"
          />
        </Link>
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-28 text-[#9A9A9A]">
          <div className="flex flex-col">
            <p className="pb-4 text-white text-sm font-medium">CONTACT</p>
            <a
              className="pb-2 text-base leading-[30px]"
              href="https://www.google.com/maps/place/C.+Arqu%C3%ADmedes,+42,+29100+Co%C3%ADn,+M%C3%A1laga,+Spain/data=!4m2!3m1!1s0xd72dd4239b8a213:0x35758345e4f05095?sa=X&ved=1t:242&ictx=111&cshid=1740708454018309"
              target="_blank"
            >
              Fusion Studios, C.
              <br />
              Arquimedes 42, Coín, Malaga
            </a>
            <a href="mailto:fusionstudioscoin@gmail.com" className="text-base">
              Email: fusionstudios@gmail.com
            </a>
          </div>
          <div>
            <p className="pb-4 text-white text-sm font-medium">MENU</p>
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setFooterShown(false)}
                >
                  <p className="text-sm leading-[30px]">{item.name}</p>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="pb-4 text-white text-sm font-medium">SOCIAL MEDIA</p>
            <div className="flex flex-col gap-2">
              {socialMedias.map((item) => (
                <a
                  key={item.name}
                  className="text-sm leading-[30px]"
                  href={item.href}
                  target="_blank"
                >
                  {item.name}
                </a>
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
