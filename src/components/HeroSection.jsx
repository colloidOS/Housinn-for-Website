import React from 'react';

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-white z-0">
      <h1 className="text-5xl font-bold mb-8">
        Your Key to Extraordinary Living Begins Here
      </h1>
      <div className="flex">
        <input
          type="text"
          placeholder="Search by address, neighborhood, city or state"
          className="px-4 py-2 w-80 rounded-l-lg focus:outline-none"
        />
        <button className="px-4 py-2 bg-gray-800 text-white rounded-r-lg hover:bg-gray-700">
          🔍
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
