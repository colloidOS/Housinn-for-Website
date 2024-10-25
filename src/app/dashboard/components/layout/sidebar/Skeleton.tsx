import React from "react";

const SkeletonLoader: React.FC = () => (
  <div className="flex flex-col gap-y-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="flex items-center justify-start gap-5 pl-11 pr-6 py-3"
      >
        <span className="w-6 h-6 bg-gray-300 animate-pulse rounded-full"></span>
        <span className="w-[120px] h-6 bg-gray-300 animate-pulse rounded-xl"></span>
      </div>
    ))}
  </div>
);

export default SkeletonLoader;
