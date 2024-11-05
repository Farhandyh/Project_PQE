import { LuUser, LuLayoutDashboard } from "react-icons/lu";
import { FaBatteryFull, FaCarBattery, FaChargingStation } from "react-icons/fa";
import { GrStorage } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiOutlineLogin } from "react-icons/hi";
import Login from "../../Login";
import { elements } from "chart.js";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(1); // Set nilai default sesuai ID pertama

  const handleLinkClick = (id) => {
    setActiveLink(id);
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
        <h1 className="text-red-600 font-poppins text-4xl font-bold">
          Battery Monitoring
        </h1>
        {/* Navigation Links */}
        <ul className="flex ml-auto mr-5 space-x-2 md:space-x-6 text-red-600">
          {NAVBAR_LINKS.map((link) => (
            <li
              key={link.id}
              className={`font-medium hover:bg-red-E01414 hover:text-white py-2 px-4 rounded-md ${
                activeLink === link.id ? "bg-red-E01414 text-white" : ""
              }`}
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
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/login">
            <img
              src="/Honda_Logo.png"
              alt="logo"
              className="w-10 md:w-20 cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
