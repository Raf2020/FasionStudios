import Image from "next/image";

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
  return (
    <div className="w-full pt-20 px-15 bg-[#1E2662]">
      <div className="flex w-full px-20 pb-20 justify-between">
        <Image
          src="/images/footer/logo.svg"
          width={284}
          height={158}
          alt="logo"
        />
        <div className="flex gap-28 text-[#9A9A9A]">
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
