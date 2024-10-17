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
    <div className="flex   p-1 rounded-[7px] bg-background-2 gap-6 w-fit" >
      {tags.map((tag) => (
        <button
          key={tag.value}
          onClick={() => onChange(tag.value)}
          className={` text-sm rounded-[0.4375rem] p-2 ${
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
