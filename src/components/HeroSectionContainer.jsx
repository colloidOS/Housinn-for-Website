import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';

const HeroContainer = () => {
  return (
    <div className="relative h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/hero.png')" }}>
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default HeroContainer;
