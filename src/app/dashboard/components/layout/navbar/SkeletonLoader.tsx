// SkeletonLoader.jsx
import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="flex items-center gap-4  animate-pulse">
      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
