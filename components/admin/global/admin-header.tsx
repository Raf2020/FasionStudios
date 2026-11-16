"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Bookings", href: "/admin/bookings" },
  { name: "Subscribers", href: "/admin/subscribers" },
  { name: "Events", href: "/admin/events" },
  { name: "Video Carousel", href: "/admin/video-carousel" },
  { name: "Classes", href: "/admin/classes" },
  { name: "Teachers", href: "/admin/teachers" },
];

const AdminHeader = () => {
  const pathName = usePathname();
  const locale = useLocale();

  return (
    <header className="bg-gray-700 text-white">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:px-8">
        <Link href="/" className="justify-self-start">
          <Image
            className="h-auto w-24 lg:w-32"
            src="/images/header/logo.svg"
            width={153}
            height={85}
            alt="Fusion Studios home"
          />
        </Link>
        <nav aria-label="Admin navigation" className="col-span-2 row-start-2 flex flex-wrap gap-x-4 gap-y-1 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:justify-center">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathName === item.href ? "page" : undefined}
              className="inline-flex min-h-11 items-center text-sm font-semibold hover:underline aria-[current=page]:text-cyan-200 aria-[current=page]:underline"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => signOut({ callbackUrl: `/${locale ?? ""}/auth/login` })}
          className="col-start-2 row-start-1 min-h-11 text-sm font-semibold hover:underline lg:col-start-3"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
