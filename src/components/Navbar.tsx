import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Logo, LogoWhite, Notification } from "../../public/icons";
import Link from "next/link";
import {
  dropdownVariants,
  tagData,
  sideItems,
  textVariants,
} from "@/data/navbar"; // assuming this contains all items
import { ChevronUp } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import SkeletonLoader from "./SkeletonLoader";
import Wrapper from "./ui/Wrapper";

interface NavbarProps {
  heroAnimated?: boolean;
  colorScheme?: "default" | "alternate";
}

const Navbar: React.FC<NavbarProps> = ({
  heroAnimated,
  colorScheme = "default",
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth(); // Get the user from AuthContext

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Simulate a delay while checking authentication status
    const timer = setTimeout(() => {
      if (user) {
        setIsLoggedIn(true);
      }
      setLoading(false); // Authentication check complete
    }, 1000); // Delay for demo purposes

    return () => clearTimeout(timer);
  }, [user]);

  // Filter sideItems based on userType
  const filteredSideItems =
    user?.userType === "individual"
      ? sideItems.filter(
          (item) => ["Profile", "Messages", "Favorites"].includes(item.route) // Show only these items for individual userType
        )
      : sideItems; // Show all items for other user types

  const image = user?.avatar || "icons/profile.svg";
  const isDefaultScheme = colorScheme === "default";

  return (
    <Wrapper disablePadding>
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={heroAnimated ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.5,
          delay: 0.1, // Additional delay if needed after HeroSection
          ease: "easeOut",
        }}
        className={`w-full grid grid-cols-2 sm:grid-cols-3 items-center justify-between relative z-10 `}
      >
        <ul
          className={`sm:flex gap-2 ${
            isDefaultScheme ? "text-gray-300" : "text-gray-600 "
          } hidden`}
        >
          {tagData.map((tag) => (
            <Link
              key={tag.tag}
              href={`/listings?tag=${tag.tag}`} // Use href directly
              className={`text-base font-semibold transition-all p-2.5 duration-500 ease-in-out text-white ${
                isDefaultScheme ? "hover:text-primary " : "hover:text-black"
              }`}
            >
              {tag.name}
            </Link>
          ))}
        </ul>

        <Link href="/" className="flex sm:justify-center">
          {isDefaultScheme ? (
            <Image
              src={LogoWhite}
              alt="Housinn logo"
              width={0}
              height={0}
              className={`w-auto h-12 ${
                isDefaultScheme ? "lg:h-16" : "lg:h-14"
              }`}
            />
          ) : (
            <Image
              src={Logo}
              alt="Housinn logo"
              width={0}
              height={0}
              className={`w-auto h-12 ${
                isDefaultScheme ? "lg:h-16" : "lg:h-14"
              }`}
            />
          )}
        </Link>

        <div className="flex justify-end items-center gap-4">
          {loading ? (
            <SkeletonLoader /> // Display the skeleton loader while checking authentication
          ) : isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={toggleDropdown}
                className={`w-fit border-[1.5px] cursor-pointer ${
                  isDefaultScheme
                    ? "border-white text-white"
                    : "border-primary text-primary"
                } p-1 rounded-full flex gap-2  justify-center items-center`}
              >
                <img
                  src={image}
                  className="w-7 h-7  rounded-full"
                  alt="profile"
                  onError={(e) => {
                    e.currentTarget.src = "/icons/user-profile.svg";
                  }}
                />
                <motion.div
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronUp />
                </motion.div>
              </div>

              {dropdownOpen && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed" 
                  variants={dropdownVariants}
                  className={`absolute right-0 mt-2 w-48 ${
                    isDefaultScheme ? "bg-white" : "bg-primary"
                  } rounded-lg shadow-lg py-2 z-10`}
                >
                  {filteredSideItems.map((item) => (
                    <motion.div key={item.id} variants={textVariants}>
                      <Link
                        href={item.link}
                        className={`flex items-center px-4 py-2 text-sm cursor-pointer ${
                          isDefaultScheme
                            ? "text-gray-700 hover:bg-gray-300"
                            : "text-gray-300 hover:bg-secondary"
                        }`}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.route}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              {/* <Image src={Notification} alt="info" width={20} height={21} /> */}
              <button
                className={`${
                  isDefaultScheme
                    ? "bg-primary text-white hover:bg-transparent hover:text-primary border-primary "
                    : "bg-white text-primary hover:bg-primary hover:text-white border-white"
                } px-6 py-3 rounded-xl border duration-500 transition-all ease-in-out`}
              >
                <Link href={`/auth/`}>Sign in</Link>
              </button>
            </div>
          )}
        </div>
      </motion.nav>
    </Wrapper>
  );
};

export default Navbar;
