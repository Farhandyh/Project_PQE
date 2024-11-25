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
    <div
      className={`relative bg-white font-poppins rounded-2xl w-full h-32 shadow-lg flex items-center justify-center ${divClass}`}
    >
      {/* Gambar di atas button */}

      <button
        onClick={onClick}
        className={`alive text-white bg-red-CF0920 px-8 py-2 ml-10 rounded-lg ${buttonClass}`}
      >
        <img
          src={imgSrc}
          alt={imgAlt}
          className="absolute top-0 -left-16 w-24 h-auto -mt-5 ml-2"
        />
        {buttonLabel}
      </button>
    </div>
  );
};

export default ImageButton;
