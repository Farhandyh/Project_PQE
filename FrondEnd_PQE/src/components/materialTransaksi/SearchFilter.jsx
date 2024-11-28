import React from "react";
import { FaSearch } from "react-icons/fa";
import "../../styleCss/Transaksi/ButtonFilter.css";

const SearchComponent = ({
  placeholder,
  onSearch,
  buttonLabel,
  onButtonClick,
}) => {
  return (
    <div className="mt-5 flex w-full">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="flex-1 bg-white border border-red-E01414 text-start h-8 pl-2 rounded-l-lg focus:outline-none"
      />
      <button onClick={onButtonClick} className="button h-8">
        <FaSearch className="mr-2" />
        {buttonLabel}
      </button>
    </div>
  );
};

export default SearchComponent;
