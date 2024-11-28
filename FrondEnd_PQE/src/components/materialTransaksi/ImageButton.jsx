import React from "react";
import "../../styleCss/CRUD/ButtonAdd.css";

const ImageButton = ({
  imgSrc,
  imgAlt,
  buttonLabel,
  onClick,
  buttonClass,
  divClass,
}) => {
  return (
    <div className={`font-poppins ${divClass}`}>
      {/* Gambar di atas button */}
      <button
        onClick={onClick}
        className={`alive relative text-white text-sm md:text-base bg-red-CF0920 px-8 py-2 ml-10 rounded-lg ${buttonClass}`}
      >
        <img
          src={imgSrc}
          alt={imgAlt}
          className="absolute top-0 -left-16 w-24 h-auto -mt-5 ml-2"
        />
        <span>{buttonLabel}</span>
      </button>
    </div>
  );
};

export default ImageButton;
