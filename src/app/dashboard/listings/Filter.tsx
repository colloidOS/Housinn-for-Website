import React, { useState } from "react";
import Modal from "../../../components/Modal"; // Assuming you have a Modal component
import Filter_arrow from "../../../../public/icons/filter-arrow.svg";
import Filter_arrow_2 from "../../../../public/icons/filter-arrow-2.svg";

import Image from "next/image";
interface FilterProps {
  activeTag: string;
  onChange: (tag: string) => void;
}

const Filter: React.FC<FilterProps> = ({ activeTag, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  const tags = ["All Properties", "For Sale", "For Rent", "Short-let", "Lands"];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex border-[1px] gap-6 border-gray-300 p-[2px] rounded-[7px] bg-background-2 ">
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
            {tag}
          </button>
        ))}
      </div>
      <button onClick={toggleModal} className=" p-2 flex items-center gap-2 border border-gray-300 rounded-[7px]">
        <span className="flex gap-1">
          {" "}
          <Image
            src={Filter_arrow}
            alt="image"
            width={14}
            height={14}
            className=" cursor-pointer"
          />{" "}
          <p className="text-[10px] text-gray-700 ">
            {" "}
            More Filters
          </p>
        </span>
        <Image
          src={Filter_arrow_2}
          alt="image"
          width={10}
          height={10}
          className=" cursor-pointer"
        />{" "}
      </button>

      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <div className="p-6">
            {/* Filter options inside modal */}
            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <label>Bedrooms</label>
                <select className="w-full border rounded p-2">
                  <option value="any">Any</option>
                  <option value="1+">1+</option>
                  <option value="2+">2+</option>
                  <option value="3+">3+</option>
                  <option value="4+">4+</option>
                  <option value="5+">5+</option>
                </select>
              </div>
              <div>
                <label>Bathrooms</label>
                <select className="w-full border rounded p-2">
                  <option value="any">Any</option>
                  <option value="1+">1+</option>
                  <option value="1.5+">1.5+</option>
                  <option value="2+">2+</option>
                  <option value="3+">3+</option>
                  <option value="4+">4+</option>
                </select>
              </div>
              {/* Additional filters can be added here */}
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
