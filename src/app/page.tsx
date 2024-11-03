"use client";
import Footer from "@/components/Footer";
import AboutUs from "@/components/aboutus/page";
import Services from "@/components/services/page";
import HeroContainer from "@/components/HeroSectionContainer";
import GetOurApp from "@/app/components/GetOurApp";
import ChooseUsReviewContainer from "@/components/ChooseUsReviewContainer";
import Listings from "@/app/components/Listings";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col min-w-full relative">
      <HeroContainer />
      <Listings  shouldSlice={true} getRoute="/posts" dataRoute="posts"/>
      <AboutUs />
      <Services />
      <ChooseUsReviewContainer />
      {/* <GetOurApp /> */}
      <Footer />
    </main>
  );
}
