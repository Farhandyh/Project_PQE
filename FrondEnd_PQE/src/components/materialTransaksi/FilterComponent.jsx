import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

const FilterButton = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="flex items-center justify-between mt-5 gap-2 px-4 py-2 h-8 w-full max-w-xs bg-red-E01414 text-white rounded-md hover:bg-red-800 transition"
        onClick={toggleDropdown}
      >
        <span className="flex items-center gap-2">
          <FaFilter className="text-lg" />
          Filter
        </span>
        <span
          className={`transform transition-transform text-13px ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 md:left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md">
          <div className="h-24">{children}</div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
