"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Logo, Notification } from "../../../../../../public/icons";
import { UserNavbarProps } from "@/types";
import SkeletonLoader from "./SkeletonLoader";

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

const UserNavbar: React.FC<UserNavbarProps> = ({ className }) => {
  const pathname = usePathname();
  const currentPath = pathname?.split("/")[2];

  // Get user data from the AuthContext
  const { user } = useAuth();
  console.log("user", user);
  const firstName = user?.firstName || "User"; // Get the firstName from context or fallback to 'User'
  const image = user?.avatar || "icons/profile.svg";

  return (
    <nav
      className={` ${className} bg-white px-[74px] py-2.5 md:left-[220px] lg:left-[252px] w-full`}
      role="navbar"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex w-full justify-between gap-1 items-center">
          <div className="flex items-center justify-between gap-1">
            {navlinks.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`text-base font-semibold transition-all p-[10px] duration-200 text-gray-500 hover:text-primary ${
                  currentPath === item.id ? "text-primary" : "text-gray-500"
                }`}
              >
                {item.route}
              </Link>
            ))}
          </div>
          <Link href={`/`}>
            <Image src={Logo} alt="Housinn logo" width={80} height={48} />
          </Link>
          <div className="flex gap-5 ">
            <Image src={Notification} alt="info" width={20} height={21} />
            <div className="w-[150px] border-[1.5px] border-gray-600 py-2.5 rounded-3xl flex gap-2.5 justify-center items-center ">
              {user ? (
                <>
                  <img
                    src={image}
                    className="w-[18px] h-[18px] rounded-full"
                    alt="profile"
                    onError={(e) => {
                      e.currentTarget.src = "/icons/profile.svg";
                    }}
                  />
                  <span className="text-sm text-gray-600">{firstName}</span>
                </>
              ) : (
                <>
                  <div className="w-4 h-4 rounded-full animate-pulse bg-gray-400"></div>
                  <div className="text-sm bg-gray-300 animate-pulse w-16 h-4 rounded-md"></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
