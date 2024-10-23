import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Logo } from "../../public/icons";
import Like from "../../public/icons/heart.svg";
import Link from "next/link";
import Cookies from "js-cookie";
import { sideItems } from "@/data/navbar";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

interface NavbarProps {
  colorScheme?: "default" | "alternate"; // Define possible color schemes
}
const dropdownVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      staggerChildren: 0.1, // Stagger the text items
      duration: 0.5
    },
  },
  closed: {
    opacity: 0,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      duration: 0.5
    },
  },
};

const textVariants = {
  hidden: { 
    opacity: 0, 
    y: 10, 
    transition: {
      duration: 0.4, // Slower entry for text
      ease: "easeInOut", 
    },
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: {
      duration: 0.4, // Slower exit for text
      ease: "easeInOut", 
    },
  },
};
const Navbar: React.FC<NavbarProps> = ({ colorScheme = "default" }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();
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
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);
  console.log("i dey find user", user);
  const image = user?.avatar || "icons/profile.svg";
  const isDefaultScheme = colorScheme === "default";
  const handleLinkClick = (tag: string) => {
    // Navigate to listings page with the selected tag
    window.location.href = `/listings?tag=${tag}`;
  };
  return (
    <nav
      className={`w-full grid grid-cols-3  items-center px-9 lg:px-[104px] py-[14px] `}
    >
      <ul
        className={`sm:flex gap-2 ${
          isDefaultScheme ? "text-white" : "text-primary"
        } hidden`}
      >
        <li>
          <Link
            href="#"
            onClick={() => handleLinkClick("buy")}
            className={`p-2 ${isDefaultScheme ? "hover:text-primary" : ""}`}
          >
            Buy
          </Link>
        </li>
        <li>
          <Link
            href="#"
            onClick={() => handleLinkClick("rent")}
            className={`p-2 ${isDefaultScheme ? "hover:text-primary" : ""}`}
          >
            Rent
          </Link>
        </li>
        <li>
          <Link
            href="#"
            onClick={() => handleLinkClick("sell")}
            className={`p-2 ${isDefaultScheme ? "hover:text-primary" : ""}`}
          >
            Sell
          </Link>
        </li>
        <li>
          <Link
            href="#"
            onClick={() => handleLinkClick("shortlet")}
            className={`p-2 ${isDefaultScheme ? "hover:text-primary" : ""}`}
          >
            Short Let
          </Link>
        </li>
      </ul>

      <div className="flex justify-center">
        <Image src={Logo} alt="Housinn logo" width={80} height={48} />
      </div>
      <div className="flex justify-end">
        {isLoggedIn ? (
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

            {/* Dropdown */}
            <motion.div
              initial="closed"
              animate={dropdownOpen ? "open" : "closed"}
              variants={dropdownVariants}
              className={`absolute right-0 mt-2 w-48 ${
                isDefaultScheme ? "bg-white" : "bg-primary"
              } rounded-lg shadow-lg py-2 z-10`}
            >
              {sideItems.map((item) => (
                <motion.div key={item.id} variants={textVariants}>
                  <Link
                    href={item.link}
                    className={`flex items-center px-4 py-2 text-sm ${
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
            {/* <Image src={Like} alt="heart" width={18} height={16} /> */}
            <button
              className={`${
                isDefaultScheme
                  ? "bg-primary text-white hover:bg-white hover:text-primary border-primary "
                  : "bg-white text-primary hover:bg-primary hover:text-white border-white"
              } px-6 py-3 rounded-xl border duration-500 transition-all ease-in-out`}
            >
              <Link href={`/auth/`}>Sign in</Link>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
