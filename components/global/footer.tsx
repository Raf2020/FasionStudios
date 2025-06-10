"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const menuItems = [
  { name: "Home", href: "/#home" },
  { name: "About Us", href: "/#about" },
  { name: "Class", href: "/#classes" },
  { name: "Contact", href: "/#contact" },
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
  const t = useTranslations("FooterSection");
  const pathName = usePathname();

  const footerHidden = pathName.startsWith("/admin") || pathName.startsWith("/auth");

  if (footerHidden) return null;

  return (
      <footer className="w-full bg-[#1E2662] text-white px-6 pt-12 pb-8 sm:px-20 sm:pt-20 sm:pb-12 hidden md:block">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <Link href="/#home">
            <Image
                className="w-48 sm:w-auto"
                src="/images/footer/logo.svg"
                width={284}
                height={158}
                alt="logo"
            />
          </Link>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-28 text-[#9A9A9A]">
            <div>
              <p className="pb-4 text-white text-sm font-medium">{t("Contact")}</p>
              <a
                  className="pb-2 text-base leading-[30px]"
                  href="https://www.google.com/maps/place/C.+Arqu%C3%ADmedes,+42,+29100+Co%C3%ADn,+M%C3%A1laga,+Spain"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                {t("Fusion Studios")}<br />
                {t("Address")}
              </a>
              <a href="mailto:fusionstudioscoin@gmail.com" className="text-base">
                {t("Email")}
              </a>
            </div>

            <div>
              <p className="pb-4 text-white text-sm font-medium">{t("Menu")}</p>
              <div className="flex flex-col gap-2">
                {menuItems.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <p className="text-sm leading-[30px]">{t(`Menus.${item.name}`)}</p>
                    </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="pb-4 text-white text-sm font-medium">{t("Social")}</p>
              <div className="flex flex-col gap-2">
                {socialMedias.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm leading-[30px]"
                    >
                      {t(`Socials.${item.name}`)}
                    </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-white mt-10"></div>

        <div className="w-full pt-6 text-center">
          <p className="text-sm">{t("CopyRight")}</p>
        </div>
      </footer>
  );
};

export default Footer;