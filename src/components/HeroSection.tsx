import React, { useState } from "react";
import Image from "next/image";
import Search from "../../public/icons/search.svg";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogoWhite } from "../../public/icons";

interface HeroSectionProps {
  onHeroAnimationComplete: () => void; // Callback prop
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onHeroAnimationComplete,
}) => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query) {
      router.push(`/listings?search=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const text = "Africa’s Innovative Property Marketplace".split(" ");

  return (
    <div className="flex relative flex-col items-center justify-center w-full gap-[67px] h-[70vh] sm:h-[60vh] lg:h-[80vh] text-center text-white z-0">
      <motion.h1 className="max-w-[1000px] text-5xl sm:text-6xl font-semibold sm:font-bold lg:text-[64px] leading-[60px] lg:leading-[87px] ">
        {text.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }} // Slight fade and vertical motion
            animate={{ opacity: 1, y: 0 }} // Fully visible and aligned
            transition={{
              duration: 0.4, // Duration of each word animation
              delay: index * 0.1, // Sequential delay based on word index
            }}
            onAnimationComplete={onHeroAnimationComplete}
            className="inline-block mx-3 text-center  sm:font-semibold" // Styling for spacing between words
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>
      <div className="relative flex w-full justify-center sm:px-0 px-4">
        <input
          type="search"
          placeholder="Search by address, neighborhood, city or state"
          className="px-6 py-[19px] w-full sm:w-[608px] rounded-md text-gray-800 text-black placeholder:text-gray-500 focus:outline-none appearance-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown} // Trigger search on Enter key
        />
        <button
          onClick={handleSearch}
          className="relative right-8 top-1/2 transform -translate-y-1/2 bg-transparent focus:outline-none"
        >
          <Image src={Search} width={18} height={18} alt="search-icon" />
        </button>
      </div>
      <p className="flex items-center gap-4 opacity-90 pt-5 sm:pt-16 text-xs sm:text-base">
        {" "}
        <Image
          src={LogoWhite}
          alt="Housinn logo"
          width={0}
          height={0}
          className={`w-auto h-12 `}
        />{" "}
        are now proud partners with
        <a href="https://fastercapital.com" target="_blank">
          <img
            src="https://fastercapital.com/images/logo/logo.png"
            alt="Faster Capital logo"
            width={0}
            height={0}
            className={`w-auto h-10 sm:h-14 `}
          />
        </a>
      </p>
    </div>
  );
};

export default HeroSection;
