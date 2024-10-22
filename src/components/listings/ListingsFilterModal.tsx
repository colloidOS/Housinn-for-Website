"use client";
import React, { useState } from "react";
import Modal from "../ui/Modal"; // Assuming you have a Modal component
import { ListingsFilterModalProps } from "@/types";
import { categories, cities, states } from "@/data/new-listing";
const ListingsFilterModal: React.FC<ListingsFilterModalProps> = ({
  toggleModal,
  applyFilters,
}) => {
  // Arrays for Bedroom and Bathroom options
  const bedroomOptions = ["1+", "2+", "3+", "4+", "5+", "6+"];
  const bathroomOptions = ["1+", "2+", "3+", "4+", "5+", "6+"];
  const ownerTypeOptions = ["public", "private"];
  const squareFeetOptions = ["No Min", "No Max", "500", "1000", "1500"];
  // State to keep track of selected state and city
  const [selectedState, setSelectedState] = useState<string>(""); // To track the selected state
  const [availableCities, setAvailableCities] = useState<string[]>([]); // To store cities of the selected state
  const [selectedCity, setSelectedCity] = useState<string>(""); // To track the selected city

  const [filterValues, setFilterValues] = useState({
    minPrice: "",
    title: "",
    address: "",
    maxPrice: "",
    bedroom: "",
    bathroom: "",
    state: "",
    city: "",
    category: "",
    ownerType: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilterValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (name: string, value: string | number) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedState(selected);
    setAvailableCities(cities[selected as keyof typeof cities] || []);
    setFilterValues((prev) => ({ ...prev, state: selected, city: "" }));
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
    setFilterValues((prev) => ({ ...prev, city: event.target.value }));
  };
  const handleApplyFilters = () => {
    applyFilters(filterValues); // Pass selected filter values to parent component

    console.log("this is the applied filter", filterValues);
    toggleModal(); // Close modal after applying filters
  };

  return (
    <div>
      {" "}
      <Modal onClose={toggleModal}>
        <form className="p-6 w-full grid md:grid-cols-2 gap-3">
          {/* Filter options inside modal */}

          <div>
            <label>Title</label>
            <input
              type="text"
              placeholder="3 bedroom flat"
              value={filterValues.title}
              onChange={handleInputChange}
              className="w-full border rounded p-2 flex-1"
              name="title"
            />
          </div>

          <div>
            <label>Address</label>
            <input
              type="text"
              placeholder="5, Bourdillon Road, Ikoyi, Lagos."
              value={filterValues.address}
              onChange={handleInputChange}
              className="w-full border rounded p-2 flex-1"
              name="address"
            />
          </div>
          {/* Min Price */}
          <div>
            <label>Min Price</label>
            <input
              type="number"
              placeholder="No Min"
              value={filterValues.minPrice}
              onChange={handleInputChange}
              className="w-full border rounded p-2 flex-1"
              name="minPrice"
            />
          </div>

          {/* Max Price */}
          <div>
            <label>Max Price</label>
            <input
              type="number"
              placeholder="No Max"
              value={filterValues.maxPrice}
              onChange={handleInputChange}
              className="w-full border rounded p-2 flex-1"
              name="maxPrice"
            />
          </div>

          {/* Bedrooms */}
          <div>
            <label>Bedrooms</label>
            <ul className="flex w-full justify-between">
              {bedroomOptions.map((bed, index) => (
                <li
                  className={`border w-full text-center py-2 ${
                    filterValues.bedroom === bed ? "bg-primary/90 text-white" : ""
                  }`}
                  key={index}
                  onClick={() => handleOptionChange("bedroom", bed)}
                >
                  {bed}
                </li>
              ))}
            </ul>
          </div>

          {/* Bathrooms */}
          <div>
            <label>Bathrooms</label>
            <ul className="flex w-full justify-between">
              {bathroomOptions.map((bath, index) => (
                <li
                  className={`border w-full text-center py-2 ${
                    filterValues.bathroom === bath ? "bg-primary/90 text-white" : ""
                  }`}
                  key={index}
                  onClick={() => handleOptionChange("bathroom", bath)}
                >
                  {bath}
                </li>
              ))}
            </ul>
          </div>

          {/* State */}
          <div className="flex flex-col">
            <label>State</label>
            <select
              name="state"
              className="p-2 border border-gray-500 rounded"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="" disabled>
                Select State
              </option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* City/Locality */}
          <div className="flex flex-col">
            <label>City</label>
            <select
              name="city"
              className="p-2 border border-gray-500 rounded"
              value={selectedCity}
              onChange={handleCityChange}
              disabled={!selectedState}
            >
              <option value="" disabled>
                Select City
              </option>
              {availableCities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* category */}
          <div className="flex flex-col">
            <label>Category</label>
            <select
              name="category"
              className="p-2 border border-gray-500 rounded"
              value={filterValues.category}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

        
          <div className="flex flex-col">
            <label>Ownership Type</label>
            <select
              name="ownerType"
              className="p-2 border border-gray-500 rounded"
              value={filterValues.ownerType}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Type
              </option>
              {ownerTypeOptions.map((owner, index) => (
                <option key={index} value={owner}>
                  {owner}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="flex flex-col">
            <label>Square Feet</label>
            <div className="square-feet w-full flex gap-2">
              <select
                name="minSquareFeet"
                className="p-2 border border-gray-500 rounded w-full"
                value={filterValues.minSquareFeet}
                onChange={handleInputChange}
              >
                {squareFeetOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                name="maxSquareFeet"
                className="p-2 border border-gray-500 rounded w-full"
                value={filterValues.maxSquareFeet}
                onChange={handleInputChange}
              >
                {squareFeetOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label>Date Listed</label>
            <div className="gap-2 flex w-full">
              <input
                type="date"
                name="dateListedFrom"
                className="p-2 border border-gray-500 rounded"
                value={filterValues.dateListedFrom}
                onChange={handleInputChange}
              />
              <input
                type="date"
                name="dateListedTo"
                className="p-2 border border-gray-500 rounded"
                value={filterValues.dateListedTo}
                onChange={handleInputChange}
              />
            </div>
          </div> */}
        </form>

        {/* Apply Filters Button */}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-primary text-white rounded-[5px]"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ListingsFilterModal;
