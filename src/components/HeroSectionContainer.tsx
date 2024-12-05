import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";

const HeroContainer = () => {
  return (
    <div
      className="relative h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/hero-bg.png')" }}
    >
      <div className="absolute inset-0 bg-primary opacity-60 z-0"></div>
      <Navbar colorScheme="default"/>
      <HeroSection />
    </div>
  );
};

export default HeroContainer;
