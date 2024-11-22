import React from "react";

const Dropdown = ({ label, options, className, onChange, value }) => {
  return (
    <div className="flex flex-col">
      {/* Label di atas dropdown */}
      <label className="text-gray-700 text-sm font-poppins font-semibold mb-0.5">
        {label}
      </label>
      <select
        className={`px-4 py-1 text-center text-sm font-poppins rounded-lg focus:outline-none border-2 border-white focus:border-red-F81A1B focus:ring-2 focus:ring-red-300 ${className}`}
        onChange={onChange}
        value={value}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
