import React, { useState } from "react";
import Image from "next/image";
import Search from "../../public/icons/search.svg";
import { useRouter } from "next/navigation";

const HeroSection = () => {
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

  return (
    <div className="flex relative flex-col items-center justify-center w-full gap-[67px] h-screen text-center text-white z-10">
      <h1 className="text-5xl font-bold sm:text-[64px] leading-[60px] sm:leading-[87px] text-center max-w-[1000px] sm:font-semibold">
        Africa’s Innovative Property Marketplace
      </h1>
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
