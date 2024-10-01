"use client";
import Footer from "@/components/Footer";
import Image from "next/image";
import AboutUs from "@/components/aboutus/page";
import Services from "@/components/services/page";
import HeroContainer from "@/components/HeroSectionContainer";
import GetOurApp from "@/app/components/GetOurApp";
import ChooseUsReviewContainer from "@/components/ChooseUsReviewContainer";
import Listings from "@/app/components/Listings";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col min-w-full ">
      <ToastContainer/>
      <HeroContainer />
      <Listings  shouldSlice={true}/>
      <AboutUs />
      <Services />
      <ChooseUsReviewContainer />
      <GetOurApp />
      <Footer />
    </div>
  );
}
