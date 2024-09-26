import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";

const HeroContainer = () => {
  return (
    <div
      className="relative h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/hero-bg.png')" }}
    >
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default HeroContainer;
