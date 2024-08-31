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
      <h2 className="w-full pt-4 pl-12 pb-[2.4375rem] text-left text-2xl font-bold">
        Saved Searches
      </h2>
      <hr />
      <div className="pt-[2.4375rem] pl-[2.3125rem] pr-[9.125rem]">
        {savedSearches.map((search) => (
          <div
            key={search.id}
            className="mb-6 flex flex-col gap-10 rounded-md border border-blue-400 pl-6 pt-5 pr-5 pb-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-blue-600">{search.type}</h3>

              <div className="flex items-center">
                <span className="mr-2">Receive Alerts</span>
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
            <div className="flex justify-between text-base">
              <p>
                House type: {search.houseType} | State: {search.state} |
                Bedroom: {search.bedroom} | Price: {search.price}
              </p>
              <button className="flex items-center gap-1">
                <Image
                  src={Trash}
                  alt="image"
                  width={1} // 16px to rem
                  height={1} // 16px to rem
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
