"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Notification from '../../../../../../public/icons/notifications.svg'

const navlinks = [
  {
    route: "For Sale",
    link: "",
    id: "dashboard",
  },
  {
    route: "Rent",
    link: "",
    id: "rent",
  },
  {
    route: "Short Let",
    link: "/",
    id: "short let",
  },
  
];

const UserNavbar = () => {
  const pathname = usePathname();
  const currentPath = pathname?.split("/")[2];
  return (
    <nav
      className=" bg-white px-[74px] py-2.5 md:left-[220px] lg:left-[252px]"
      role="navbar"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex w-full  justify-between gap-1">
          <div className="flex items-center justify-between gap-1">
            {navlinks.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`text-base font-semibold transition-all p-[10px] duration-200 text-gray-500 hover:text-primary ${currentPath === item.id ? "text-primary" : "text-gray-500"}`}
              >
                {item.route}
              </Link>
            ))}
          </div>
          <Image
          src={`/icons/logo.svg`}
          alt='Housinn logo'
          width={80}
          height={48}
          />            
          <div className='flex gap-5'>
              <Image
              src={Notification}
              alt='info'
              width={20}
              height={21}
              /> 
              <div className="w-[115px] border-[1.5px] border-gray-600 rounded-3xl  ">

              </div>
          </div>
        </div>
        
      </div>
    </nav>
  );
};

export default UserNavbar;