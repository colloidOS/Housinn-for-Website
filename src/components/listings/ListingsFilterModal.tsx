"use client";
import React, { useEffect, useState } from "react";
import Modal from "../ui/Modal"; // Assuming you have a Modal component
import { FilterType, ListingsFilterModalProps } from "@/types";
import { categories, cities, states } from "@/data/new-listing";
import { bathroomOptions, bedroomOptions, ownerTypeOptions } from "@/data/filter";
const ListingsFilterModal: React.FC<ListingsFilterModalProps> = ({
  toggleModal,
  applyFilters,
  initialFilters,
}) => {
  const [selectedState, setSelectedState] = useState<string>(""); // To track the selected state
  const [availableCities, setAvailableCities] = useState<string[]>([]); // To store cities of the selected state
  const [selectedCity, setSelectedCity] = useState<string>(""); // To track the selected city

  const handleResetFilters = () => {
    setFilterValues({});
    applyFilters({}); // Pass an empty object to clear filters and reset the URL
    toggleModal(); // Close the modal after resetting filters
  };
  const [filterValues, setFilterValues] = useState<FilterType>(initialFilters);

  useEffect(() => {
    // Set initial filter values and dependent states when modal opens
    setFilterValues(initialFilters);
    setSelectedState(initialFilters.state || ""); // Synchronize state dropdown
    setSelectedCity(initialFilters.city || ""); // Synchronize city dropdown
  
    if (initialFilters.state) {
      setAvailableCities(cities[initialFilters.state as keyof typeof cities] || []);
    }
  }, [initialFilters]);
  
  
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
        <form className="p-6 w-full grid grid-cols-2 gap-3">
          {/* Filter options inside modal */}

          <div className="">
            <label>Title</label>
            <input
              type="text"
              placeholder="3 bedroom flat"
              value={filterValues.title}
              onChange={handleInputChange}
              className="w-full border rounded p-2 flex-1 col-span-1
              "
              name="title"
            />
          </div>

          <div className="">
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
          <div className="col-span-2">
            <label>Bedrooms</label>
            <ul className="flex w-full justify-between">
              {bedroomOptions.map((bed, index) => (
                <li
                  className={`border w-full text-center py-2 ${
                    filterValues.bedroom === bed
                      ? "bg-primary/90 text-white"
                      : ""
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
          <div className="col-span-2">
            <label>Bathrooms</label>
            <ul className="flex w-full justify-between">
              {bathroomOptions.map((bath, index) => (
                <li
                  className={`border w-full text-center py-2 ${
                    filterValues.bathroom === bath
                      ? "bg-primary/90 text-white"
                      : ""
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
              value={filterValues.state || ""}
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
              value={filterValues.city || ""} 
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

          <div className="flex col-span-2 justify-between mt-4">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-secondary/10 border border-secondary  text-secondary rounded-[5px]"
            >
              Reset All Filters
            </button>

            <button
              className="px-4 py-2 bg-primary text-white rounded-[5px]"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ListingsFilterModal;
