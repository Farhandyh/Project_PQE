import React from "react";
import "../../styleCss/CRUD/ButtonAdd.css";

const Button = ({ buttonLabel, onClick, buttonClass, divClass }) => {
  return (
    <div
      className={`relative bg-white font-poppins rounded-2xl shadow-lg flex items-center justify-center ${divClass}`}
    >
      {/* Gambar di atas button */}
      <button
        onClick={onClick}
        className={`alive text-white px-8 py-2 ml-10 rounded-lg ${buttonClass}`}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default Button;
