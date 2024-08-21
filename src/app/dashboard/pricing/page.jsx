"use client";
import React, { useState } from "react";
import { ChevronRight, CheckCircle2Icon } from "lucide-react";
import Image from "next/image";
import Basic from "@/../public/icons/pricing-basic.svg";
import Pro from "@/../public/icons/pricing-pro.svg";
import Premium from "@/../public/icons/pricing-premium.svg";

function Pricing() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = {
    monthly: [
      {
        name: "Basic",
        motto: "For Starters and Testers",
        currency: "₦",
        price: "0",
        duration: "free",
        listings: "10 Listings",
        images: "Unlimited images / listing",
        badge: "",
      },

      {
        name: "Pro",
        motto: "Most Preferred Plan",
        currency: "₦",
        price: "10,000",
        duration: "/month",
        listings: "Unlimited Listings",
        images: "Unlimited Images / Listing",
        sponsor: "5 Sponsored Listings",
        badge: "Blue Verified Badge",
      },

      {
        name: "Premium",
        motto: "Get the Best out of Housinn",
        currency: "₦",
        price: "20,000",
        duration: "/month",
        listings: "Unlimited Listings",
        images: "Unlimited Images / Listing",
        sponsor: "10 Sponsored Listings",
        recomm: "Housinn Recommendation",
        badge: "Golden Verified Badge",
      },
    ],

    annually: [
      {
        name: "Basic",
        motto: "For Starters and Testers",
        currency: "₦",
        price: "0",
        duration: "/free",
        listings: "10 Listings",
        images: "Unlimited images / listing",
        badge: "",
      },
      {
        name: "Pro",
        motto: "Most Preferred Plan",
        currency: "₦",
        price: "90,000",
        duration: "/year",
        listings: "Unlimited Listings",
        images: "Unlimited Images / Listing",
        sponsor: "5 Sponsored Listings",
        badge: "Blue Verified Badge",
      },
      {
        name: "Premium",
        motto: "Get the Best out of Housinn",
        currency: "₦",
        price: "180,000",
        duration: "/year",
        listings: "Unlimited Listings",
        images: "Unlimited Images / Listing",
        sponsor: "10 Sponsored Listings",
        recomm: "Housinn Recommendation",
        badge: "Golden Verified Badge",
      },
    ],
  };

  return (
    <div className="w-full flex flex-col bg-background-2 gap-5 px-12 py-10">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-black">Dashboard</h2>
        <p className="flex gap-0.5 text-gray-600">
          Dashboard <ChevronRight /> Pricing
        </p>
      </div>
      <div className="flex flex-col gap-8 justify-center w-full">
        <div className="flex flex-col gap-6 justify-center w-full">
          <div className="flex flex-col gap-3 justify-center items-center">
            <h1 className="text-4xl font-semibold text-black">
              Choose A Suitable Plan
            </h1>
            <p className="text-gray-600 text-sm items-center">
              Explore the perfect plan for you, our pricing choices are
              thoughtfully designed to meet your needs, cancel anytime.
            </p>
          </div>
          <div className="flex gap-6 mx-auto rounded-sm border border-gray-300 p-1">
            <div
              onClick={() => setBillingCycle("monthly")}
              className={`cursor-pointer px-4 py-2 rounded-sm ${
                billingCycle === "monthly"
                  ? "bg-blue-500 text-white duration-300"
                  : "text-gray-600"
              }`}
            >
              Monthly
            </div>
            <div
              onClick={() => setBillingCycle("annually")}
              className={`cursor-pointer px-4 py-2 rounded-sm ${
                billingCycle === "annually"
                  ? "bg-blue-500 text-white duration-300"
                  : "text-gray-600"
              }`}
            >
              Annually (25% off)
            </div>
          </div>
        </div>

        {/* Plan cards */}
        <div className="flex gap-6 w-full">
          <div className="w-full flex-nowrap flex flex-col justify-between py-6 px-4 border border-white rounded-lg  bg-white">
            <div className="flex flex-col gap-4">
              <div className="flex  flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <Image src={Basic} width={48} height={48} />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-semibold text-gray-700">
                      {plans[billingCycle][0].name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {plans[billingCycle][0].motto}
                    </span>
                  </div>
                </div>
                <p className="text-4xl text-secondary font-semibold">
                  {plans[billingCycle][0].price}
                </p>
                <hr className="text-gray-200" />
              </div>
              <ul className="text-gray-600 flex flex-col gap-3">
                <li className="flex gap-1">
                  <CheckCircle2Icon />
                  {plans[billingCycle][0].listings}
                </li>
                <li className="flex gap-1">
                  <CheckCircle2Icon />
                  {plans[billingCycle][0].images}
                </li>
              </ul>
            </div>
            <button
              disabled
              className="mt-6 px-4 py-2 disabled:text-gray-500 disabled:bg-gray-200  bg-blue-500 text-white rounded-sm flex-nowrap"
            >
              Current Plan
            </button>
          </div>

          <div className="w-full flex-nowrap p-6 border flex flex-col justify-between rounded-lg shadow-sm bg-blue-500 text-white">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <Image src={Pro} width={48} height={48} />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-semibold">
                      {plans[billingCycle][1].name}
                    </h3>
                    <span className="text-xs">
                      {plans[billingCycle][1].motto}
                    </span>
                  </div>
                </div>
                <p className="text-4xl font-semibold">
                  {plans[billingCycle][1].price}
                </p>
                <hr className="text-primary-2" />
              </div>
              <ul className="flex flex-col gap-3">
                <li className="flex gap-1">
                  <CheckCircle2Icon />
                  {plans[billingCycle][1].listings}
                </li>
                <li className="flex gap-1">
                  <CheckCircle2Icon />
                  {plans[billingCycle][1].images}
                </li>
                <li className="flex gap-1">
                  <CheckCircle2Icon />
                  {plans[billingCycle][1].sponsor}
                </li>
                <li className="flex gap-1">
                  <CheckCircle2Icon />
                  {plans[billingCycle][1].badge}
                </li>
              </ul>
            </div>
            <button className="mt-6 px-4 py-2 bg-white text-blue-500 rounded-sm flex-nowrap">
              Get Started
            </button>
          </div>

          <div className="w-full flex-nowrap flex flex-col justify-between p-6 border border-white rounded-lg shadow-sm bg-white">
            <div className="flex flex-col gap-4">
              <div className="flex  flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <Image src={Premium} width={48} height={48} />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-semibold text-gray-700">
                      {plans[billingCycle][2].name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {plans[billingCycle][2].motto}
                    </span>
                  </div>
                </div>
                <p className="text-4xl text-secondary font-semibold">
                  {plans[billingCycle][2].price}
                </p>
                <hr className="text-gray-200" />
              </div>
              <ul className="text-gray-600 flex flex-col gap-3">
                <li className="flex gap-1">
                  <CheckCircle2Icon />
                  {plans[billingCycle][2].listings}
                </li>
                <li className="flex gap-1">
                  <CheckCircle2Icon />
                  {plans[billingCycle][2].images}
                </li>
                <li className="flex gap-1">
                  <CheckCircle2Icon />
                  {plans[billingCycle][2].sponsor}
                </li>
                <li className="flex gap-1">
                  <CheckCircle2Icon />
                  {plans[billingCycle][2].recomm}
                </li>
                <li className="flex gap-1">
                  <CheckCircle2Icon />
                  {plans[billingCycle][2].badge}
                </li>
              </ul>
            </div>
            <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-sm flex-nowrap">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;