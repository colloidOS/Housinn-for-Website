import React from "react";
import Image from "next/image";
import Logo from "../../public/icons/Logo.svg";
import Like from "../../public/icons/heart.svg";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  Heart,
  Home,
  Mail,
  User,
  Search,
} from "lucide-react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      // Cleanup event listener
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token"); // or use 'userid' depending on how you're storing it
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

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

  return (
    <nav className=" w-full flex justify-between items-center px-9 md:px-[104px] py-[14px]">
      <ul className="sm:flex gap-2 text-white hidden">
        <li>
          <Link href="#" className="hover:text-primary p-[10px]">
            Buy
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-primary p-[10px]">
            Rent
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-primary p-[10px]">
            Sell
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-primary p-[10px]">
            Short Let
          </Link>
        </li>
      </ul>
      <Image src={Logo} alt="Housinn logo" width={80} height={48} />
      {isLoggedIn ? (
        <div className="relative " ref={dropdownRef}>
          <div
            onClick={toggleDropdown}
            className="w-fit border-[1.5px] border-white px-4 text-white py-2.5 rounded-3xl flex gap-6 justify-center items-center "
          >
            <User />
            <ChevronDown />
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
              {sideItems.map((item) => (
                <Link
                  href={item.link}
                  key={item.id}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
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
          <button className="bg-primary text-white px-6 py-[11px] rounded ">
            <Link href={`/auth/`}>Sign in</Link>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
