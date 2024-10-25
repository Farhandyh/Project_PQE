//ICONS //
import { LuUser, LuLayoutDashboard } from "react-icons/lu";
import { FaBatteryFull, FaCarBattery, FaChargingStation } from "react-icons/fa";
import { GrStorage } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiOutlineLogin } from "react-icons/hi";
import Login from "../../Login";
import { elements } from "chart.js";
//ICONS //

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const NAVBAR_LINKS = [
    { name: "All", icon: LuLayoutDashboard, path: "/Monitor" }, // Tambahkan path
    { name: "Battery", icon: FaBatteryFull, path: "/MonitorBattery" }, // Tambahkan path
    { name: "Charging", icon: FaChargingStation, path: "/charging" }, // Tambahkan path
    { name: "Storage", icon: GrStorage, path: "/storage" }, // Tambahkan path
  ];

  return (
    <div className="w-full bg-white fixed top-0 z-10 shadow-lg rounded-b-3xl">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-red-600 font-poppins text-4xl font-bold">Battery Monitoring</h1>
        {/* Navigation Links */}
        <ul className="flex space-x-2 md:space-x-6 text-red-600">
          {NAVBAR_LINKS.map((link, index) => (
            <li
              key={index}
              className={`font-medium hover:bg-red-E01414 hover:text-white py-2 px-4 rounded-md ${
                activeLink === index ? "bg-red-E01414 text-white" : ""
              }`}
              onClick={() => handleLinkClick(index)}
            >
              <Link to={link.path} className="flex items-center space-x-2">
                <span>{<link.icon />}</span>
                <span className="hidden md:inline">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/login"> {/* Link ke halaman utama atau yang diinginkan */}
            <img
              src="/Honda_Logo.png"
              alt="logo"
              className="w-10 md:w-20 cursor-pointer" // Menambahkan cursor pointer untuk menunjukkan bahwa itu adalah tautan
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;