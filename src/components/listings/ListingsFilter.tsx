import React, { useState } from "react";
import { FilterArrow, FilterArrow2 } from "../../../public/icons";
import Image from "next/image";
import ListingsFilterModal from "./ListingsFilterModal";
import { ListingsFilterProps } from "@/types";


const ListingsFilter: React.FC<ListingsFilterProps> = ({
  activeTag,
  onChange,
  applyFilters,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  const tags = ["all-properties", "Sale", "Rent", "Shortlet"];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };



  return (
    <div className="flex items-center gap-8">
      <div className="xl:flex hidden border  gap-6 border-gray-300 p-[2px] rounded-[7px] bg-background-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onChange(tag === activeTag ? "all-properties" : tag)}
            className={`text-sm rounded-[7px] p-2 transition-all duration-700 ease-in-out  ${
              activeTag === tag
                ? "bg-primary-100 text-primary"
                : "text-gray-700"
            }`}
          >
            {tag === "all-properties"
              ? "All Properties"
              : tag === "Sale"
              ? "For Sale"
              : tag === "Rent"
              ? "For Rent"
              : tag === "Shortlet"
              ? "Shortlet"
              : ""}
          </button>
        ))}
      </div>
      <button
        onClick={toggleModal}
        className="p-3 h-11 flex items-center gap-2 border border-gray-300 rounded-[7px]"
      >
        <span className="flex gap-1">
          <Image
            src={FilterArrow}
            alt="filter arrow"
            width={20}
            height={20}
            className="cursor-pointer"
          />
          <p className="text-sm text-gray-700 flex  w-full">
            <span className="hidden xl:flex">More</span>&nbsp;Filters
          </p>
        </span>
        <Image
          src={FilterArrow2}
          alt="filter arrow 2"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      </button>

      {isModalOpen && (
     <ListingsFilterModal toggleModal={toggleModal} applyFilters={applyFilters}/>
      )}
    </div>
  );
};

export default ListingsFilter;
