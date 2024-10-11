import React from "react";
import Modal from "../ui/Modal"; // Assuming you have a Modal component
import { ListingsFilterModalProps } from "@/types";
const ListingsFilterModal: React.FC<ListingsFilterModalProps> = ({
  toggleModal,
}) => {

  // Arrays for Bedroom and Bathroom options
  const bedroomOptions = ["Any", "1+", "2+", "3+", "4+", "5+"];
  const bathroomOptions = ["Any", "1+", "2+", "3+", "4+", "5+"];

  // Define your select options
  const states = ["All States", "State 1", "State 2", "State 3"];
  const localities = [
    "All Localities",
    "Locality 1",
    "Locality 2",
    "Locality 3",
  ];
  const featuredOptions = ["All Listings", "Featured", "Not Featured"];
  const statusOptions = ["Any Status", "Available", "Sold"];
  const squareFeetOptions = ["No Min", "No Max", "500", "1000", "1500"];
  return (
    <div>
      {" "}
      <Modal onClose={toggleModal}>
        <form className="p-6 w-full grid  md:grid-cols-2 gap-3  ">
          {/* Filter options inside modal */}

          <div >
            <label>Min Price</label>
            <input
              type="number"
              placeholder="No Min"
              className="w-full border rounded p-2 flex-1"
            />
          </div>
          <div >
            <label>Max Price</label>
            <input
              type="number"
              placeholder="No Max"
              className="w-full border rounded p-2 flex-1"
            />
          </div>

          <div>
            <label>Bedrooms</label>
            <ul className="flex w-full justify-between">
              {bedroomOptions.map((bed, index) => (
                <li
                  className="border w-full text-center py-2 active:bg-secondary focus-within:bg-secondary"
                  key={index}
                >
                  {bed}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label>Bathrooms</label>
            <ul className="flex w-full justify-between">
              {bathroomOptions.map((bath, index) => (
                <li
                  className="border w-full text-center py-2 active:bg-secondary focus-within:bg-secondary"
                  key={index}
                >
                  {bath}
                </li>
              ))}
            </ul>
          </div>
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
            <select
              name="locality"
              className="p-2 border border-gray-500 rounded"
            >
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
            <select
              name="featured"
              className="p-2 border border-gray-500 rounded"
            >
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
            <select
              name="status"
              className="p-2 border border-gray-500 rounded"
            >
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col ">
            <label>Square Feet</label>
            <div className="square-feet w-full flex gap-2">
              <select
                name="minSquareFeet"
                className="p-2 border border-gray-500 rounded w-full"
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
              >
                {squareFeetOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col w-full ">
            <label>Date Listed</label>
            <div className="gap-2 flex w-full">
              <input
                type="date"
                name="dateListedFrom"
                className="p-2 border border-gray-500 rounded"
              />
              <input
                type="date"
                name="dateListedTo"
                className="p-2 border border-gray-500 rounded"
              />
            </div>
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-primary text-white rounded-[5px]"
            onClick={toggleModal}
          >
            Apply Filters
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ListingsFilterModal;
