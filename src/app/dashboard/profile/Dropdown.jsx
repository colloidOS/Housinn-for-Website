import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

function Dropdown({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div
        className="border border-gray-300 rounded-md px-4 py-2 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || placeholder}</span>
        <ChevronDown />
      </div>
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-300 rounded-md z-10">
          {options.map((option, idx) => (
            <div
              key={idx}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
