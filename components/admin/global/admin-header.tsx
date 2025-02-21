"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Bookings", href: "/admin/bookings" },
  { name: "Subscribers", href: "/admin/subscribers" },
];

const AdminHeader = () => {
  const pathName = usePathname();

  return (
    <div className="w-full py-4 px-6 sm:px-15 bg-gray-700">
      <div className="flex items-center justify-between">
        <Link href="/">
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
              className="text-base font-semibold"
              style={{
                color: pathName === item.href ? "#65FBFA" : "white",
                textDecoration:
                  pathName === item.href ? "underline" : undefined,
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
