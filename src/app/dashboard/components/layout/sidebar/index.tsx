"use client";
import { LucideProps, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ForwardRefExoticComponent, RefAttributes, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import SkeletonLoader from "./Skeleton";
import Image from "next/image";
import { sideItems, addNewListingLinks } from "@/data/sidebar";
import { Logo } from "../../../../../../public/icons";

interface Iproperties {
  sideNavitems?: {
    route: string;
    link: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    id: string;
  }[];
  className?: string;
}

const SettingsSidebar: FC<Iproperties> = ({ className }) => {
  const { user } = useAuth(); // Get the user data from AuthContext
  const pathname = usePathname();
  const currentPath =
    pathname?.split("/").length === 2 ? "dashboard" : pathname?.split("/")[2];
  const organizationPath = pathname?.split("/")[2];
  const isDashboard =
    currentPath === "dashboard" && organizationPath === undefined;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Track mobile menu state

  // If user data is not yet loaded, show the skeleton loader
  if (!user) {
    return (
      <div
        className={` ${className} h-full hidden lg:flex flex-col gap-11 items-center justify-center bg-white-200 pt-6  md:w-[220px] md:justify-start `}
      >
        <SkeletonLoader />
      </div>
    );
  }

  // Filter the side items based on userType
  const filteredSideItems =
    user?.userType === "individual"
      ? sideItems.filter((item) =>
          ["profile", "messages", "favorites"].includes(item.id)
        )
      : sideItems;

  // Sidebar Content
  const SidebarContent = (
    <section className=" sm:pr-4 flex flex-col gap-y-3 justify-center">
      <Link href={`/`} className="flex items-end justify-end  lg:hidden">
        <Image src={Logo} alt="" />
      </Link>
      {filteredSideItems.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          data-testid={item.id}
          role="sidebar-link"
          onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
          className={`${
            currentPath === item.id || (isDashboard && item.id === "dashboard")
              ? "bg-active text-primary"
              : "bg-transparent text-gray-500 hover:bg-gray-300"
          } flex cursor-pointer items-center lg:justify-cente gap-5 rounded-lg px-3 sm:px-6 xl:pl-11 py-3 text-base sm:text-lg transition-all duration-300 ease-in md:h-auto md:w-auto md:justify-start md:rounded-sm`}
        >
          {item.icon && <item.icon className="h-5 w-5" role="sidebar-icon" />}
          <span className="text-nowrap">{item.route}</span>
        </Link>
      ))}
      {user?.userType !== "individual" && (
        <section className="flex flex-col items-center w-full justify-center">
          {addNewListingLinks.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              data-testid={item.id}
              role="sidebar-link"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
              className={`${
                organizationPath === item.id
                  ? "shadow-custom-negative-shadow"
                  : " text-gray-500 hover:bg- "
              } px-3 sm:px-6 py-3 w-fit bg-secondary text-white rounded-md text-nowrap text-base font-semibold flex items-center justify-center cursor-pointer transition-all duration-200 ease-in md:justify-between`}
            >
              <div className="flex items-center justify-start gap-2">
                {item.icon && (
                  <item.icon
                    className="w-[18px] h-[18px]"
                    role="sidebar-icon"
                  />
                )}
                <span className="text-base text-nowrap">{item.route}</span>
              </div>
            </Link>
          ))}
        </section>
      )}
    </section>
  );

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <button
        className="lg:hidden fixed top-3 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar for Desktop */}
      <div
        className={` ${className} h-full hidden lg:flex flex-col gap-11 items-center justify-center bg-white-200 pt-6 lg:w-[230px] xl:w-[270px] md:justify-start `}
      >
        {SidebarContent}
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 z-40 w-3/5 sm:w-2/5 h-screen bg-white shadow-lg flex flex-col p-4"
            >
              {SidebarContent}
            </motion.div>

            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30"
              onClick={() => setIsMobileMenuOpen(false)} // Close sidebar when overlay is clicked
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SettingsSidebar;
