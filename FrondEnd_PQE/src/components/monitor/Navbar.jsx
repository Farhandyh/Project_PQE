import { LuLayoutDashboard } from "react-icons/lu";
import { FaBatteryFull, FaChargingStation } from "react-icons/fa";
import { GrStorage } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(1); // Set nilai default sesuai ID pertama
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Untuk kontrol hamburger menu

  const handleLinkClick = (id) => {
    setActiveLink(id);
    setIsMenuOpen(false); // Tutup menu saat link diklik
  };

  const NAVBAR_LINKS = [
    { id: 1, name: "All", icon: LuLayoutDashboard, path: "/Monitor" },
    { id: 2, name: "Charging", icon: FaBatteryFull, path: "/MonitorCharging" },
    {
      id: 3,
      name: "Testing",
      icon: FaChargingStation,
      path: "/MonitorTesting",
    },
    { id: 4, name: "Storage", icon: GrStorage, path: "/MonitorStorage" },
  ];

  return (
    <div className="w-full bg-white fixed top-0 z-10 shadow-custom-header rounded-b-3xl">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo (Desktop & Mobile) */}
        <Link
          to="/login"
          className="flex items-center transition-all duration-300 ease-in-out"
        >
          <img
            src="/Honda_Logo.png"
            alt="logo"
            className="w-10 md:w-20 cursor-pointer transition-all duration-300 ease-in-out"
          />
        </Link>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-red-600 text-3xl transition-all duration-300 ease-in-out"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Navigation Links (Desktop) */}
        <ul className="hidden md:flex ml-auto mr-5 space-x-2 md:space-x-6 text-red-600">
          {NAVBAR_LINKS.map((link) => (
            <li
              key={link.id}
              className={`font-medium hover:bg-red-E01414 hover:text-white py-2 px-4 rounded-md ${
                activeLink === link.id ? "bg-red-E01414 text-white" : ""
              } transition-all duration-300 ease-in-out`}
            >
              <Link
                to={link.path}
                className="flex items-center space-x-2"
                onClick={() => handleLinkClick(link.id)}
              >
                <span>{<link.icon />}</span>
                <span className="hidden md:inline">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Navigation Links (Mobile Dropdown) */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 right-0 w-1/2 bg-white shadow-lg rounded-b-lg transform transition-all duration-300 ease-in-out">
            <ul className="flex flex-col text-red-600">
              {NAVBAR_LINKS.map((link) => (
                <li
                  key={link.id}
                  className={`font-medium py-3 px-5 rounded-md transition-all duration-200 ease-in-out
                              hover:bg-red-600 hover:text-white
                              ${
                                activeLink === link.id
                                  ? "bg-red-600 text-white"
                                  : ""
                              }`}
                >
                  <Link
                    to={link.path}
                    className="flex items-center space-x-2"
                    onClick={() => handleLinkClick(link.id)}
                  >
                    <span>{<link.icon />}</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
