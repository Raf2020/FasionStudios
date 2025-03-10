"use client";

// import { useCurrentUser } from "@/hooks/use-current-user";
import Image from "next/image";
import { useGlobalStore } from "@/zustand/global-store";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { usePathname as useLocalePathname } from "@/i18n/navigation";
import { useEffect, useMemo, useState } from "react";

const menuItems = [
  { name: "Home", href: "/#home" },
  { name: "About us", href: "/#about" },
  { name: "Classes", href: "/#classes" },
  { name: "Contact", href: "/#contact" },
];

const Header = () => {
  const t = useTranslations("HeaderSection");
  // const currentUser = useCurrentUser();
  const { setFooterShown } = useGlobalStore();
  const [headerShown, setHeaderShown] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  const pathName = usePathname();
  const headerHidden = useMemo(() => pathName.startsWith("/admin"), [pathName]);

  const localePathName = useLocalePathname();
  const locale = useLocale();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleScroll = () => {
    console.log(headerShown);
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
        display: headerHidden ? "none" : "block",
        // transform: headerShown ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <div className="w-full bg-black bg-opacity-20">
        <div className="flex w-full py-4 px-6 sm:px-15 items-center justify-between">
          <Link href="/#home">
            <Image
              className="w-24 sm:w-auto"
              src="/images/header/logo.svg"
              width={153}
              height={85}
              alt="logo"
            />
          </Link>
          <div className="hidden sm:flex gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white text-base font-semibold hover:text-gray-200"
              >
                {t(`${item.name}`)}
              </Link>
            ))}
            {/* <Link
              href={currentUser ? "/admin" : "/auth/login"}
              className="text-white text-base font-semibold hover:text-gray-200"
            >
              {currentUser ? "Admin" : "Login"}
            </Link> */}
            <Link
              href={localePathName + window.location.hash}
              locale={locale === "es" ? "en" : "es"}
              className="text-white text-base font-semibold hover:text-gray-200"
            >
              {locale === "es" ? "EN" : "ES"}
            </Link>
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
