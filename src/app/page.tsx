"use client";
import Footer from "@/components/Footer";
import Image from "next/image";
import AboutUs from "../components/aboutus/page";
import Services from "../components/services/page";
import HeroContainer from "../components/HeroSectionContainer";
import GetOurApp from "@/components/GetOurApp";
import ChooseUsReviewContainer from "@/components/ChooseUsReviewContainer";
import ListingsPage from "@/components/ListingsPage";
import { listings } from "../data/listings";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full ">
      <HeroContainer />
      <ListingsPage listings={listings} />
      <AboutUs />
      <Services />
      <ChooseUsReviewContainer />
      <GetOurApp />
      <Footer />
    </main>
  );
}
