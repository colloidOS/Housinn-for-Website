import React from "react";
import { ListingsFilterProps } from "@/types";

const ListingFilter: React.FC<ListingsFilterProps> = ({
  activeTag,
  onChange,
}) => {
  // Map between display labels and actual tag values
  const tags = [
    { label: "For Sale", value: "sale" },
    { label: "For Rent", value: "rent" },
    { label: "Short-let", value: "shortlet" },
  ];

  return (
    <div className="flex   p-[2px] rounded-[7px] bg-background-2 gap-6">
      {tags.map((tag) => (
        <button
          key={tag.value}
          onClick={() => onChange(tag.value)}
          className={` text-[14px] rounded-[7px] p-2 ${
            activeTag === tag.value
              ? "bg-primary-100 text-primary"
              : " text-gray-700"
          }`}
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
};

export default ListingFilter;
