import { FaBars } from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="sticky top-0 z-20 bg-white shadow-custom-header flex justify-between items-center p-3">
      {/* Tombol Hamburger */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-white hover:bg-gray-100"
        >
          <FaBars className="text-red-E01414 text-xl" />
        </button>
        <h1 className="text-4xl font-bold text-red-E01414"></h1>
      </div>

      {/* Pencarian dan Profil */}
      <div className="flex items-center space-x-2 mr-3">
        {/* Input Cari */}
        <div className="hidden md:flex">
          <input
            type="text"
            placeholder="Cari"
            className="bg-gray-200 text-center w-9 h-9 rounded-full focus:w-56 focus:outline-0 focus:ring-1 focus:ring-indigo-600"
          />
        </div>
        {/* Tombol Cari */}
        <div className="flex items-center w-20 h-9 bg-blue-500 justify-center rounded-xl">
          <button className="relative text-xl text-white font-semibold">
            Cari
          </button>
        </div>
        {/* Gambar Profil */}
        <img
          className="w-9 h-9 rounded-full border-2"
          src="/Honda_Logo.png"
          alt="Logo Honda"
        />
      </div>
    </div>
  );
};

export default Header;
