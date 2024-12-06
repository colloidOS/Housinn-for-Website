import React, { useState } from "react";
import Image from "next/image";
import Search from "../../public/icons/search.svg";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
    <div className="flex relative flex-col items-center justify-center w-full gap-[67px] h-[70vh] md:h-[85vh] text-center text-white z-0">
      <motion.h1 className="max-w-[1000px] text-5xl font-semibold sm:font-bold sm:text-[64px] leading-[60px] sm:leading-[87px] ">
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
    </div>
  );
};

export default HeroSection;
