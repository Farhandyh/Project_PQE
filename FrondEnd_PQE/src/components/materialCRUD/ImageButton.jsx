import React from "react";
import "../../styleCss/CRUD/ButtonAdd.css";

const ImageButton = ({ imgSrc, imgAlt, buttonLabel, onClick, buttonClass }) => {
  return (
    <div className="relative bg-white font-poppins rounded-2xl w-80 h-32 mb-4 shadow-lg flex items-center justify-center">
      {/* Gambar di atas button */}
      <img
        src={imgSrc}
        alt={imgAlt}
        className="absolute top-10 left-6 w-24 h-auto -mt-5 ml-2"
      />
      <button
        onClick={onClick}
        className={`alive text-white bg-red-CF0920 px-8 py-2 ml-10 rounded-lg ${buttonClass}`}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default ImageButton;
