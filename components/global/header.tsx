"use client";

import Image from "next/image";
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
  const [headerShown, setHeaderShown] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathName = usePathname();
  const headerHidden = useMemo(() => pathName.startsWith("/admin"), [pathName]);

  const localePathName = useLocalePathname();
  const locale = useLocale();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setHeaderShown(position < lastScrollY || position === 0);
      setLastScrollY(position);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setHash(window.location.hash || "");
    const onHashChange = () => setHash(window.location.hash || "");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
      <div
          className="z-10 fixed top-0 left-0 w-full transition-transform duration-200"
          style={{
            display: headerHidden ? "none" : "block",
            transform: headerShown ? "translateY(0)" : "translateY(-100%)",
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

            <div className="flex items-center gap-6">
              {/* Desktop Nav */}
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
              </div>

              {/* Language Toggle */}
              <Link
                  href={localePathName + hash}
                  locale={locale === "es" ? "en" : "es"}
                  className="text-white text-base font-semibold hover:text-gray-200"
              >
                {locale === "es" ? "EN" : "ES"}
              </Link>

              {/* Hamburger for Mobile */}
              <Image
                  className="w-8 sm:hidden cursor-pointer"
                  onClick={toggleMobileMenu}
                  src="/images/icons/hamburger.svg"
                  width={64}
                  height={64}
                  alt="hamburger"
              />
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
              <div className="sm:hidden px-4 pb-4 pt-2">
                <div className="bg-black/70 backdrop-blur-md rounded-lg p-4 space-y-3 animate-fade-in">
                  {menuItems.map((item) => (
                      <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-white text-base font-medium hover:text-gray-300 transition-colors"
                      >
                        {t(`${item.name}`)}
                      </Link>
                  ))}
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default Header;