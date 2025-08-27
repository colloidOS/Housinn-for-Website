import React, { useState } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";

const HeroContainer = () => {
  const [heroAnimated, setHeroAnimated] = useState(false); // State to track HeroSection animation

  return (
    <div
      className="relative h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/hero-bg.png')" }}
    >
      <div className="absolute inset-0 bg-primary opacity-65 z-0"></div>
      <Navbar colorScheme="default" heroAnimated={heroAnimated} />
      <HeroSection onHeroAnimationComplete={() => setHeroAnimated(true)} />
    </div>
  );
};

export default HeroContainer;
