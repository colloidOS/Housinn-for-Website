import { SideItem } from "@/types";
import {
    LayoutDashboard,
    Heart,
    Home,
    Mail,
    User,
    Search,
  } from "lucide-react";
export const sideItems: SideItem[] = [
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

  export const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
    closed: {
      opacity: 0,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5,
      },
    },
  };
  
  export const textVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  export const tagData = [
    { name: "Rent", tag: "rent" },
    { name: "Sale", tag: "sale" },
    { name: "Short Let", tag: "shortlet" },
  ];