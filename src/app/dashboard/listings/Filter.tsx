import React, { useState } from "react";
import Modal from "../../../components/Modal"; // Assuming you have a Modal component
import Filter_arrow from "../../../../public/icons/filter-arrow.svg";
import Filter_arrow_2 from "../../../../public/icons/filter-arrow-2.svg";
import Image from "next/image";

interface FilterProps {
  activeTag: string;
  onChange: (tag: string) => void;
}

// Reusable component to render list of options for filters
const FilterList: React.FC<{ label: string; options: string[] }> = ({
  label,
  options,
}) => (
  <div>
    <label>{label}</label>
    <ul className="flex w-full justify-between">
      {options.map((option, index) => (
        <li
          className="border w-full text-center py-2 active:bg-secondary focus-within:bg-secondary"
          key={index}
        >
          {option}
        </li>
      ))}
    </ul>
  </div>
);

const Filter: React.FC<FilterProps> = ({ activeTag, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  const tags = ["all-properties", "sale", "rent", "shortlet"];

  // Arrays for Bedroom and Bathroom options
  const bedroomOptions = ["Any", "1+", "2+", "3+", "4+", "5+"];
  const bathroomOptions = ["Any", "1+", "2+", "3+", "4+", "5+"];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Define your select options
  const states = ['All States', 'State 1', 'State 2', 'State 3'];
  const localities = ['All Localities', 'Locality 1', 'Locality 2', 'Locality 3'];
  const featuredOptions = ['All Listings', 'Featured', 'Not Featured'];
  const statusOptions = ['Any Status', 'Available', 'Sold'];
  const squareFeetOptions = ['No Min', 'No Max', '500', '1000', '1500'];

  return (
    <div className="flex items-center gap-4">
      <div className="xl:flex hidden border-[1px] gap-6 border-gray-300 p-[2px] rounded-[7px] bg-background-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onChange(tag)}
            className={`text-[1rem] rounded-[7px] p-2 ${
              activeTag === tag
                ? "bg-primary-100 text-primary"
                : "text-gray-700"
            }`}
          >
            {tag === "all-properties"
              ? "All Properties"
              : tag === "sale"
              ? "For Sale"
              : tag === "rent"
              ? "For Rent"
              : tag === "shortlet"
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
            src={Filter_arrow}
            alt="filter arrow"
            width={20}
            height={20}
            className="cursor-pointer"
          />
          <p className="text-sm text-gray-700">
            <span className="hidden xl:flex">More</span> Filters
          </p>
        </span>
        <Image
          src={Filter_arrow_2}
          alt="filter arrow 2"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      </button>

      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <div className="p-6">
            {/* Filter options inside modal */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div>
                  <label>Min Price</label>
                  <input
                    type="number"
                    placeholder="No Min"
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label>Max Price</label>
                  <input
                    type="number"
                    placeholder="No Max"
                    className="w-full border rounded p-2"
                  />
                </div>
              </div>

              {/* Bedrooms and Bathrooms filters using the reusable FilterList component */}
              <FilterList label="Bedrooms" options={bedroomOptions} />
              <FilterList label="Bathrooms" options={bathroomOptions} />

              <div className="here">
                {/* Additional filters can be added here */}
                <div className="grid grid-cols-2 gap-4">
                  {/* State */}
                  <div className="flex flex-col">
                    <label>State</label>
                    <select name="state" className="p-2 border border-gray-500 rounded">
                      {states.map((state, index) => (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Locality */}
                  <div className="flex flex-col">
                    <label>Locality</label>
                    <select name="locality" className="p-2 border border-gray-500 rounded">
                      {localities.map((locality, index) => (
                        <option key={index} value={locality}>
                          {locality}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Featured */}
                  <div className="flex flex-col">
                    <label>Featured</label>
                    <select name="featured" className="p-2 border border-gray-500 rounded">
                      {featuredOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col">
                    <label>Status</label>
                    <select name="status" className="p-2 border border-gray-500 rounded">
                      {statusOptions.map((status, index) => (
                        <option key={index} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Square Feet */}
                  <div className="flex flex-col col-span-2 w-full">
                    <label>Square Feet</label>
                    <div className="square-feet w-full">
                      <select name="minSquareFeet" className="p-2 border border-gray-500 rounded">
                        {squareFeetOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <select name="maxSquareFeet" className="p-2 border border-gray-500 rounded">
                        {squareFeetOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date Listed */}
                  <div className="flex flex-col">
                    <label>Date Listed</label>
                    <div className="date-listed w-full">
                      <input type="date" name="dateListedFrom" className="p-2 border border-gray-500 rounded"/>
                      <input type="date" name="dateListedTo" className="p-2 border border-gray-500 rounded"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-primary text-white rounded-[5px]"
                onClick={toggleModal}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Filter;
