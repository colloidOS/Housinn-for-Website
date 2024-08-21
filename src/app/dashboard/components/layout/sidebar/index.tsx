"use client";
import {
  LayoutDashboard,
  ChevronDown,
  Heart,
  Home,
  LucideProps,
  Mail,
  User,
  Search,
  SquarePlus,
} from "lucide-react";
import Link from "next/link";
// import Home from '../../../../../../public/icons/home-icon.svg';
import { usePathname } from "next/navigation";
import { FC, ForwardRefExoticComponent, RefAttributes } from "react";

const sideItems = [
  {
    route: "Dashboard",
    link: "/dashboard",
    icon: LayoutDashboard,
    id: "dashboard",
  },
  {
    route: "Profile",
    link: "/dashboard/profile",
    icon: User,
    id: "profile",
  },
  {
    route: "My Listings",
    link: "/dashboard/listings",
    icon: Home,
    id: "listings",
  },
  {
    route: "Messages",
    link: "/dashboard/messages",
    icon: Mail,
    id: "messages",
  },
  {
    route: "Favorites",
    link: "/dashboard/favorites",
    icon: Heart,
    id: "favorites",
  },
  {
    route: "Saved Searches",
    link: "/dashboard/saved-searches",
    icon: Search,
    id: "save-searches",
  },
];

const addNewListingLinks = [
  {
    route: "Add New Listing",
    link: "/dashboard/add-new-listing",
    icon: SquarePlus,
    id: "add-new-listing",
  },
];

interface Iproperties {
  sideNavitems?: {
    route: string;
    link: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    id: string;
  }[];
  currenPathName?: string;
}
const SettingsSidebar: FC<Iproperties> = ({ sideNavitems = sideItems }) => {
  const pathname = usePathname();
  const currentPath =
    pathname?.split("/").length === 2 ? "dashboard" : pathname?.split("/")[2];
  const organizationPath = pathname?.split("/")[2];
  const isDashboard =
    currentPath === "dashboard" && organizationPath === undefined;

  return (
    <div className="h-screen flex w-[50px] flex-col gap-11 items-center justify-center bg-white-200 pt-6  md:w-[275px] md:justify-start ">
      <section className="pr-4  flex flex-col  gap-y-3">
        {sideNavitems.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            data-testid={item.id}
            role="sidebar-link"
            className={`${currentPath === item.id || (isDashboard && item.id === "dashboard") ? "bg-active text-primary" : "bg-transparent text-gray-500 hover:bg-gray-300"} flex cursor-pointer items-center justify-center gap-5 rounded-full pl-11 pr-6 py-3 text-lg transition-all duration-300 ease-in md:h-auto md:w-auto md:justify-start md:rounded-sm`}
          >
            {item.icon && <item.icon className="h-5 w-5" role="sidebar-icon" />}
            <span className="text-nowrap">{item.route}</span>
          </Link>
        ))}
      </section>

      <section className="flex flex-col items-center w-full justify-center">
        {addNewListingLinks.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            data-testid={item.id}
            role="sidebar-link"
            className={`${organizationPath === item.id ? "shadow-custom-negative-shadow" : " text-gray-500 hover:bg- "} px-6 py-[11px]  w-fit bg-secondary text-white rounded-md text-base font-semibold flex items-center justify-center cursor-pointer transition-all duration-200 ease-in md:justify-between `}
          >
            <div className="flex items-center justify-start gap-2">
              {item.icon && (
                <item.icon className="w-[18px] h-[18px]" role="sidebar-icon" />
              )}
              <span className="text-base  text-nowrap">{item.route}</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default SettingsSidebar;
