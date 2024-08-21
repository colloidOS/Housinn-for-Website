"use client";

// import {
//   Banknote,
//   Bell,
//   ChevronLeft,
//   ChevronRight,
//   Database,
//   Globe,
//   LucideProps,
//   User,
//   UserRoundCog,
//   UsersIcon,
// } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ForwardRefExoticComponent, RefAttributes } from "react";

const sideItems = [
  {
    route: "Dashboard",
    link: "/dashboard",
    id: "dashboard",
  },
  {
    route: "Profile",
    link: "/dashboard/profile",
    id: "profile",
  },
  {
    route: "My Listings",
    link: "/dashboard/listings",
    id: "listings",
  },
  {
    route: "Messages",
    link: "/dashboard/messages",
    id: "messages",
  },
  {
    route: "Favorites",
    link: "/dashboard/favorites",
    id: "favorites",
  },
  {
    route: "Saved Searches",
    link: "/dashboard/saved-searches",
    id: "save-searches",
  },
];

const addNewListingLinks = [
  {
    route: "Add New Listing",
    link: "/dashboard/add-new-listing",
    id: "add-new-listing",
  },
];

interface Iproperties {
  sideNavitems?: {
    route: string;
    link: string;
    id: string;
  }[];
  currenPathName?: string;
}
const SettingsSidebar: FC<Iproperties> = ({ sideNavitems = sideItems }) => {
  const pathname = usePathname();
  console.log(pathname)
  const currentPath =
    pathname?.split("/").length === 2 ? "dashboard" : pathname?.split("/")[2];
  const organizationPath = pathname?.split("/")[2];

  const isDashboard =
    currentPath === "dashboard" && organizationPath === undefined;


  return (
    <div className="h-screen  w-[50px] flex-col items-center justify-center bg-white-200 pt-6 md:block md:w-[275px] md:justify-start ">
      <section className="mb-2 md:pr-4  flex flex-col items-center gap-y-3 border-b-[1px] border-border md:items-stretch">
        {sideNavitems.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            data-testid={item.id}
            role="sidebar-link"
            className={`${currentPath === item.id || isDashboard && item.id === "dashboard" ? "bg-active text-primary" : "bg-transparent text-gray-500 hover:bg-gray-300"} flex cursor-pointer items-center justify-center gap-2.5 rounded-full pl-[54px] py-3 text-lg transition-all duration-300 ease-in md:h-auto md:w-auto md:justify-start md:rounded-sm`}
          >
            <span className="hidden md:block">{item.route}</span>
          </Link>
        ))}
      </section>
        
      <section className="flex flex-col items-center w-fit pl-[38px] gap-y-3 pt-2 md:items-stretch">
        {addNewListingLinks.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            data-testid={item.id}
            role="sidebar-link"
            className={`${organizationPath === item.id ? "shadow-custom-negative-shadow" : " text-gray-500 hover:bg- "} px-6 py-[11px]  w-fit bg-secondary text-white rounded-md text-base font-semibold flex items-center justify-center cursor-pointer transition-all duration-200 ease-in md:justify-between `}
          >
            <div className="flex items-center justify-start gap-2.5">
              <span className="hidden md:block">{item.route}</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default SettingsSidebar;
