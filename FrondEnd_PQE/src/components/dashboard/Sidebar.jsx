import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuLayoutDashboard, LuUser } from "react-icons/lu";
import { FaBatteryFull, FaChargingStation, FaCarBattery } from "react-icons/fa";
import { GrStorage } from "react-icons/gr";
import { HiOutlineLogin } from "react-icons/hi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import "../../styleCss/SideBar/SideBarCss.css";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const SIDEBAR_LINKS = [
    {
      id: 1,
      path: "/dashboard/home",
      name: "Dashboard",
      icon: LuLayoutDashboard,
    },
    { id: 2, path: "/dashboard/users", name: "Users", icon: LuUser },
    { id: 3, path: "/dashboard/battery", name: "Battery", icon: FaBatteryFull },
    { id: 4, path: "/dashboard/storage", name: "Storage", icon: GrStorage },
    {
      id: 5,
      path: "/dashboard/chargingunit",
      name: "Charging Unit",
      icon: FaChargingStation,
    },
    {
      id: 6,
      path: "/dashboard/testingmachine",
      name: "Testing Unit",
      icon: FaCarBattery,
    },
    {
      id: 7,
      path: "/dashboard/users",
      name: "Charging Info",
      icon: FaChargingStation,
    },
    {
      id: 8,
      path: "/dashboard/testing",
      name: "Testing Info",
      icon: FaCarBattery,
    },
    {
      id: 9,
      path: "/dashboard/storageinfo",
      name: "Storage Info",
      icon: GrStorage,
    },
  ];

  return (
    <div
      className="w-56 md:w-56 fixed left-0 top-0 z-10 h-screen bg-red-E01414 rounded-r-3xl"
      style={{ boxShadow: "4px 0 10px rgba(0, 0, 0, 0.3)" }}
    >
      {/* Logo */}
      <div className="left-0 top-0 h-32 bg-white rounded-tr-3xl">
        <img
          src="/Honda_Logo.png"
          alt="logo"
          className="pt-8 px-4 mt-10 ml-7 w-40 hidden md:flex"
        />
        <img
          src="/Honda_Logo.png"
          alt="logo"
          className="pt-8 px-4 mt-10 ml-7 w-40 flex md:hidden"
        />
      </div>

      {/* Menu Links */}
      <div className="mt-6 text-white pt-8 px-4 scrollable-menu hidden-scrollbar">
        <ul className="space-y-6">
          {SIDEBAR_LINKS.slice(0, 3).map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className={`flex items-center justify-start space-x-6 transition-all duration-300 ${
                  activeLink === link.id
                    ? "text-red-E01414 bg-white rounded-full"
                    : "hover:bg-white hover:text-red-E01414 hover:rounded-full"
                }`}
                onClick={() => handleLinkClick(link.id)}
              >
                <span
                  className={`flex items-center justify-center w-10 h-10 transition-all duration-300 ${
                    activeLink === link.id
                      ? "bg-white text-red-E01414 rounded-full"
                      : "hover:bg-white hover:text-red-E01414 hover:rounded-full"
                  }`}
                >
                  {link.icon()}
                </span>
                {/* Teks tetap terlihat pada layar kecil maupun besar */}
                <span className="text-sm">{link.name}</span>
              </Link>
            </li>
          ))}

          {/* Dropdown Menu */}
          <li>
            <div
              className="flex items-center justify-start space-x-6 cursor-pointer hover:bg-white hover:text-red-600 hover:rounded-full transition-all duration-300 border-b-2 border-transparent hover:border-red-600"
              onClick={toggleDropdown}
            >
              <span className="flex items-center justify-center w-10 h-10 bg-white text-red-600 rounded-full">
                {FaCarBattery()}
              </span>
              <span className="text-sm font-semibold">Machine</span>
              <span>
                {isDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            </div>
            {isDropdownOpen && (
              <ul className="ml-8 mt-2 space-y-2 relative">
                <div className="absolute top-0 left-[-16px] h-full border-l-2 border-white"></div>

                <div className="pt-2">
                  {SIDEBAR_LINKS.slice(4, 6).map((link, index) => (
                    <li key={index} className="relative">
                      <div className="absolute top-0 left-[-16px] h-full w-[calc(100%+16px)] border-t-2 border-white"></div>

                      <Link
                        to={link.path}
                        className={`flex items-center justify-start space-x-2 transition-all duration-300 ${
                          activeLink === link.id
                            ? "text-red-600 bg-white rounded-full"
                            : "hover:bg-white hover:text-red-600 hover:rounded-full"
                        }`}
                        onClick={() => handleLinkClick(link.id)}
                      >
                        <span
                          className={`flex items-center justify-center w-10 h-10 transition-all duration-300 ${
                            activeLink === link.id
                              ? "bg-white text-red-600 rounded-full"
                              : "hover:bg-white hover:text-red-600 hover:rounded-full"
                          }`}
                        >
                          {link.icon()}
                        </span>
                        <span className="text-sm">{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </div>
              </ul>
            )}
          </li>

          {SIDEBAR_LINKS.slice(6, 9).map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className={`flex items-center justify-start space-x-6 transition-all duration-300 ${
                  activeLink === link.id
                    ? "text-red-E01414 bg-white rounded-full"
                    : "hover:bg-white hover:text-red-E01414 hover:rounded-full"
                }`}
                onClick={() => handleLinkClick(link.id)}
              >
                <span
                  className={`flex items-center justify-center w-10 h-10 transition-all duration-300 ${
                    activeLink === link.id
                      ? "bg-white text-red-E01414 rounded-full"
                      : "hover:bg-white hover:text-red-E01414 hover:rounded-full"
                  }`}
                >
                  {link.icon()}
                </span>
                <span className="text-sm">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout button at the bottom */}
      <Link to="/login">
        <div className="w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center">
          <p className="flex items-center space-x-2 text-s text-white font-bold py-2 px-5 hover:bg-white rounded-full hover:text-red-E01414">
            <HiOutlineLogin />
            <span>Log Out</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
