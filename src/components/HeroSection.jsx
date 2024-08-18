import React from 'react';
import Image from 'next/image';
import Search from '../../public/icons/search.svg'

const HeroSection = () => {
  return (
    <div className="flex relative flex-col items-center justify-center w-full gap-[67px] h-screen text-center text-white z-0">
      <h1 className="text-[64px] leading-[87px] text-center max-w-[1000px] font-semibold ">
        Your Key to Extraordinary Living Begins Here
      </h1>
      <div className="relative flex w-full justify-center">
        <input
          type="search"
          placeholder="Search by address, neighborhood, city or state"
          className="px-6 py-[19px] sm:w-[608px] rounded-md text-gray-800 text-black placeholder:text-gray-500 focus:outline-none  appearance-none"
        />
        <button
          className="relative right-8 top-1/2 transform -translate-y-1/2  bg-transparent focus:outline-none"
        >
          <Image
            src={Search}
            width={18}
            height={18}
            alt="search-icon"
          />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
