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
import { useAuth } from "@/context/AuthContext";
function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/auth"); // Redirect to auth if not signed in
    }
  }, []);

  useEffect(() => {
    // Simulate a delay while checking authentication status
    const timer = setTimeout(() => {
      if (user?.userType === "individual") {
        router.push("/");
      }

      return () => clearTimeout(timer);
    }, 2000);
  });

  if (user?.userType === "individual") {
    return (
      <section className="grid h-full py-10 w-full place-items-center bg-white">
        <div className="fixed left-0 top-0 h-screen w-screen bg-white" />

        <div className="pointer-events-noe text-center relative z-30 flex flex-col gap-y-6 lg:max-w-lg max-w-md px-3 sm:px-0 ">
          <h1 className="text-8xl font-bold text-gray-800 text-center">401</h1>
          <p className="text-center font-medium uppercase text-secondary sm:text-2xl md:text-3xl lg:text-4xl lg:font-bold xl:font-bold">
            Not Authorized
          </p>
          <p className="text-gray-500">
            It seems the page you’re looking for doesn’t exist. It may have been
            moved or deleted. Please check the URL, or return to the homepage to
            explore our site.
          </p>
          
          <p className="text-gray-500 text-center mt-10">
            If you need assistance, please{" "}
            <a
              href="mailto:housinnafrica@gmail.com"
              className="text-blue-600 hover:underline"
            >
              contact our support team
            </a>
            .
          </p>
        </div>
      </section>
    );
  } else {
    return (
      <div className="flex flex-col gap-6 relative w-full h-full bg-background-2 px-6 sm:px-12 lg:px-7 xl:px-12 py-5 sm:py-10">
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

        <div className="flex flex-col sm:flex-row lg:grid grid-cols-3 w-full gap-6">
          <PieChart />
          <Subscription />
          <MessageList />
        </div>
      </div>
    );
  }
}
export default Dashboard;
