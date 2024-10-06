import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Logo } from "../../public/icons";
import Like from "../../public/icons/heart.svg";
import Link from "next/link";
import Cookies from "js-cookie";
import { sideItems } from "@/data/navbar";
import { ChevronDown, User } from "lucide-react";

interface NavbarProps {
  colorScheme?: "default" | "alternate"; // Define possible color schemes
}

const Navbar: React.FC<NavbarProps> = ({ colorScheme = "default" }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const isDefaultScheme = colorScheme === "default";
  const handleLinkClick = (tag: string) => {
    // Navigate to listings page with the selected tag
    window.location.href = `/listings?tag=${tag}`;
  };
  return (
    <nav
      className={`w-full grid grid-cols-3  items-center px-9 lg:px-[104px] py-[14px] `}
    >
   <ul className={`sm:flex gap-2 ${isDefaultScheme ? "text-white" : "text-primary"} hidden`}>
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
              } px-4 py-2.5 rounded-3xl flex gap-6 justify-center items-center`}
            >
              <User />
              <ChevronDown />
            </div>
            {dropdownOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 ${
                  isDefaultScheme ? "bg-white" : "bg-primary"
                } rounded-lg shadow-lg py-2 z-10`}
              >
                {sideItems.map((item) => (
                  <Link
                    href={item.link}
                    key={item.id}
                    className={`flex items-center px-4 py-2 text-sm ${
                      isDefaultScheme
                        ? "text-gray-700 hover:bg-gray-300"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.route}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4">
            <Image src={Like} alt="heart" width={18} height={16} />
            <button
              className={`${
                isDefaultScheme
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
              }px-6 py-3 rounded`}
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
