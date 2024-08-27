// components/SavedSearches.tsx
import React from "react";
import { savedSearches } from "../../../data/savedSearches";

const SavedSearches: React.FC = () => {
  return (
    <div className="w-full bg-background-2">
      <h2 className="text-2xl font-bold pl-12 pt-4 pb-[39px] w-full text-left ">
        Saved Searches
      </h2>
      <hr />{" "}
      <div className="pt-[39px] pl-[37px] pr-[146px]">
        {" "}
        {savedSearches.map((search) => (
          <div
            key={search.id}
            className="border border-blue-400  mb-4 rounded-md"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-blue-600 font-bold">{search.type}</h3>
              <div className="flex items-center">
                <span className="mr-2">Receive Alerts</span>
                <input
                  type="checkbox"
                  checked={search.receiveAlerts}
                  className="toggle-checkbox"
                />
              </div>
            </div>
            <p>
              House type: {search.houseType} | State: {search.state} | Bedroom:{" "}
              {search.bedroom} | Price: {search.price}
            </p>
            <button className="text-red-500 hover:text-red-700 mt-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedSearches;
