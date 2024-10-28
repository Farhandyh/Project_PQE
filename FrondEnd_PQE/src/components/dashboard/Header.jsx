import { useState } from "react";

const Header = () => {

  return (
    <div className="flex justify-between items-center p-3 rounded-t-2xl bg-white">
      <div>
        <h1 className="text-4xl ml-5 font-bold text-red-E01414">Data Battery</h1>
      </div>
      <div className="flex items-center space-x-2 mr-3">
        <div className="hidden md:flex">
          <input
            type="text"
            placeholder="Cari"
            className="bg-gray-200 text-center w-9 h-9 rounded-full focus:w-56 focus:outline-0 focus:ring-1 focus:ring-indigo-600"
          />
        </div>
        <div className="flex items-center w-20 h-9 bg-blue-500 justify-center rounded-xl">
          <button className="relative text-xl text-white font-semibold">
            Cari
          </button>
        </div>
        <img
            className="w-9 h-9 rounded-full border-2"
            src="/Honda_Logo.png"
            alt=""
          />
      </div>
    </div>
  );
};

export default Header;
