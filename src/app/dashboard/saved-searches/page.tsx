"use client";
import React, { useState } from "react";
import Trash from "../../../../public/icons/trash.svg";
import { savedSearches as initialSavedSearches } from "../../../data/savedSearches";
import Image from "next/image";
import Switch from "react-switch";

const SavedSearches: React.FC = () => {
  const [savedSearches, setSavedSearches] = useState(initialSavedSearches);

  const handleToggle = (id: number) => {
    const updatedSearches = savedSearches.map((search) => {
      if (search.id === id) {
        return { ...search, receiveAlerts: !search.receiveAlerts };
      }
      return search;
    });

    setSavedSearches(updatedSearches);
  };

  return (
    <div className="w-full bg-background-2">
      <h2 className="text-2xl font-bold pl-12 pt-4 pb-[39px] w-full text-left ">
        Saved Searches
      </h2>
      <hr />
      <div className="pt-[39px] pl-[37px] pr-[146px]">
        {savedSearches.map((search) => (
          <div
            key={search.id}
            className="flex flex-col gap-10 border pl-6 pt-5 pr-5 pb-4 border-blue-400  mb-6 rounded-md"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-blue-600 font-bold">{search.type}</h3>

              <div className="flex items-center">
                <span className="mr-2 ">Receive Alerts</span>
                <Switch
                  checked={search.receiveAlerts}
                  onChange={() => handleToggle(search.id)}
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                  handleDiameter={19}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={20}
                  width={48}
                  className="react-switch"
                  id={`switch-${search.id}`}
                />
              </div>
            </div>
            <div className="flex justify-between text-base ">
              <p>
                House type: {search.houseType} | State: {search.state} |
                Bedroom: {search.bedroom} | Price: {search.price}
              </p>
              <button className="  flex gap-1 items-center">
                <Image
                  src={Trash}
                  alt="image"
                  width={16}
                  height={16}
                  className="cursor-pointer"
                />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedSearches;
