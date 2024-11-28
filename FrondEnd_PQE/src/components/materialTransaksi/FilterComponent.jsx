import React, { useState } from "react";

const FilterComponent = ({ filters, onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="relative w-full mt-5">
      {/* Dropdown utama */}
      <select
        className="bg-red-E01414 text-white text-lg font-semibold rounded-lg h-10 px-4"
        value={selectedFilter}
        onChange={(e) => handleFilterChange(e.target.value)}
      >
        <option value="" disabled>
          Filter
        </option>
        {filters.map((filter) => (
          <option key={filter.category} value={filter.category}>
            {filter.label}
          </option>
        ))}
      </select>

      {/* Sub-filter berdasarkan kategori yang dipilih */}
      {selectedFilter && (
        <div className="absolute top-full left-0 w-full bg-white border border-red-E01414 mt-1 rounded-lg shadow-lg">
          <ul className="p-2">
            {filters
              .find((filter) => filter.category === selectedFilter)
              ?.options.map((option) => (
                <li
                  key={option.value}
                  className="hover:bg-gray-100 px-2 py-1 cursor-pointer"
                  onClick={() => handleFilterChange(option.value)}
                >
                  {option.label}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
