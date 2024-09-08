"use client";
import React from "react";
import Subscription from "./components/layout/pricing";
import PieChart from "./components/layout/recent-listing/index";
import MessageList from "./components/layout/messages";
import Image from "next/image";
import Search from "../../../public/icons/search.svg";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/auth"); // Redirect to auth if not signed in
    }
  }, []);
  return (
    <div className="flex flex-col gap-6 relative w-full h-full bg-background-2 px-12 py-10">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-black">Dashboard</h2>
        <div className="flex flex-col justify-center items-center">
          <div className="relative flex justify-start bg-white items-center w-full px-6 gap-4 py-[19px] sm:w-[608px] rounded-md text-gray-800 shadow-custom-shadow text-black">
            <span className="bg">
              <Image src={Search} width={20} height={20} alt="search-icon" />
            </span>
            <input
              type="search"
              placeholder="Search for a property"
              className=" placeholder:text-gray-500 w-full focus:outline-none appearance-none"
            />
          </div>
        </div>
      </div>

      <div className="flex w-full gap-6">
        <PieChart />
        <Subscription />
        <MessageList />
      </div>
    </div>
  );
}

export default Dashboard;
