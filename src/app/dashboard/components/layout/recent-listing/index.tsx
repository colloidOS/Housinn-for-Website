import React from "react";

const PieChart = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Total Listings</h2>
      <div className="relative w-[120px]  xl:w-[150px] h-[150px]">
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <circle
            cx="18"
            cy="18"
            r="15.91549431"
            fill="transparent"
            stroke="#5b8ff9"
            strokeWidth="5"
            strokeDasharray="63 37"
            strokeDashoffset="25"
          />
          <circle
            cx="18"
            cy="18"
            r="15.91549431"
            fill="transparent"
            stroke="#ffbb00"
            strokeWidth="5"
            strokeDasharray="37 63"
            strokeDashoffset="-25"
          />
          <circle
            cx="18"
            cy="18"
            r="15.91549431"
            fill="transparent"
            stroke="#2c3e50"
            strokeWidth="5"
            strokeDasharray="28 72"
            strokeDashoffset="-62"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-semibold">569</span>
          <span className="text-sm text-gray-500">Total Listings</span>
        </div>
      </div>
      <div className="flex justify-around w-full mt-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
          <span className="text-sm text-gray-600">228 Houses</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></span>
          <span className="text-sm text-gray-600">200 Rentals</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-gray-700 rounded-full"></span>
          <span className="text-sm text-gray-600">141 Lands</span>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
