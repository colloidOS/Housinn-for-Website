import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Logo } from "../../public/icons";
import Link from "next/link";
import {
  dropdownVariants,
  linkData,
  sideItems,
  textVariants,
} from "@/data/navbar"; // assuming this contains all items
import { ChevronDown, ChevronUp, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import SkeletonLoader from "./SkeletonLoader";
import Wrapper from "./ui/Wrapper";
import { useRouter } from "next/navigation";

interface NavbarProps {
  colorScheme?: "default" | "alternate";
}

const Navbar: React.FC<NavbarProps> = ({ colorScheme = "default" }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
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

  const handleLinkClick = (tag: string) => {
    // Navigate to listings page with the selected tag
    // window.location.href = `/listings?tag=${tag}`;
    router.push(`/listings?tag=${tag}`);
    console.log("rhis is working ", tag);
  };

  return (
    <Wrapper>
      <nav
        className={`w-full grid grid-cols-2 lg:grid-cols-3 items-center justify-between ] py-[14px]`}
      >
        <ul
          className={`sm:flex gap-2 ${
            isDefaultScheme ? "text-white" : "text-primary"
          } hidden`}
        >
          {linkData.map((link) => (
            <Link
              key={link.tag}
              href={`/listings?tag=${link.tag}`} // Use href directly
              className={`p-2 ${
                isDefaultScheme ? "hover:text-primary duration-200" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </ul>

        <Link href="/" className="flex lg:justify-center">
          <Image
            src={Logo}
            alt="Housinn logo"
            width={0}
            height={0}
            className="w-auto h-16"
          />
        </Link>

        <div className="flex justify-end">
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
                } px-2 py-1.5 rounded-3xl flex gap-6 justify-center items-center`}
              >
                {image ? (
                  <img src={image} alt="1" className="w-8 h-8 rounded-full" />
                ) : (
                  <User />
                )}
                <motion.div
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronUp />
                </motion.div>
              </div>

              <motion.div
                initial="closed"
                animate={dropdownOpen ? "open" : "closed"}
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
                          : "text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.route}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ) : (
            <div className="flex gap-4">
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
      </nav>
    </Wrapper>
  );
};

export default Navbar;
