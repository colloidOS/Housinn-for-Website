"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "../../../../../../public/icons";
import { UserNavbarProps } from "@/types";
import { tagData } from "@/data/navbar";

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
      className={` ${className} bg-white  py-2 px-6 sm:px-10 xl:px-16 w-full`}
      role="navbar"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex w-full justify-between gap-1 items-center">
          <ul
            className={`hidden pl-10 md:flex gap-2 text-gray-500 
          `}
          >
            {tagData.map((tag) => (
              <Link
                key={tag.tag}
                href={`/listings?tag=${tag.tag}`} // Use href directly
                className={`text-base font-semibold transition-all p-2.5 duration-500 ease-in-out  hover:text-gray`}
              >
                {tag.name}
              </Link>
            ))}
          </ul>
          <Link href={`/`} className="pl-10 sm:p-0">
            <Image
              src={Logo}
              alt="Housinn logo"
              width={0}
              height={0}
              className={`w-auto  h-12 lg:h-14`}
            />
          </Link>
          <div className="flex gap-5 ">
            {/* <Image src={Notification} alt="info" width={20} height={21} /> */}
            <div className="w-fit px-4 border-[1.5px] border-gray-600 py-2.5 rounded-xl flex gap-2.5 justify-center items-center ">
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
