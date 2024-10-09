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
