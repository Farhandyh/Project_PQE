import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuLayoutDashboard, LuUser } from "react-icons/lu";
import { FaBatteryFull, FaChargingStation, FaCarBattery } from "react-icons/fa";
import { GrStorage } from "react-icons/gr";
import { HiOutlineLogin } from "react-icons/hi";
import { BsBatteryCharging } from "react-icons/bs";
import { TbBrandSpeedtest } from "react-icons/tb";
import {
  TbHomeBolt,
  TbHomeStats,
  TbHomeDown,
  TbHomeSignal,
} from "react-icons/tb";
import { GrVirtualMachine } from "react-icons/gr";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import "../../styleCss/SideBar/SideBarCss.css";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const [isDropdownOpenMachine, setIsDropdownOpenMachine] = useState(false);
  const [isDropdownOpenStorage, setIsDropdownOpenStorage] = useState(false);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const toggleDropdownMachine = () => {
    setIsDropdownOpenMachine((prevState) => !prevState);
  };

  const toggleDropdownStorage = () => {
    setIsDropdownOpenStorage((prevState) => !prevState);
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
    { id: 4, path: "/dashboard/rack", name: "Rack Unit", icon: GrStorage },
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
      path: "/dashboard/charging",
      name: "Charging Battery",
      icon: BsBatteryCharging,
    },
    {
      id: 8,
      path: "/dashboard/testing",
      name: "Testing Battery",
      icon: TbBrandSpeedtest,
    },
    {
      id: 9,
      path: "/dashboard/storage-checkIn",
      name: "Check-In",
      icon: TbHomeStats,
    },
    {
      id: 10,
      path: "/dashboard/storage-checkOut",
      name: "Check-Out",
      icon: TbHomeDown,
    },
    {
      id: 11,
      path: "/dashboard/storage-history",
      name: "History",
      icon: TbHomeSignal,
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
                className={`flex items-center justify-start w-60 space-x-2 transition-all duration-300 ${
                  activeLink === link.id
                    ? "text-red-E01414 bg-white rounded-lg"
                    : "hover:bg-gray-F5F5F5 hover:text-red-E01414 hover:rounded-lg"
                }`}
                onClick={() => handleLinkClick(link.id)}
              >
                <span
                  className={`flex items-center text-xl justify-center w-10 h-10 transition-all duration-300 ${
                    activeLink === link.id
                      ? "bg-white text-red-E01414 rounded-lg"
                      : "hover:bg-white hover:text-red-E01414 hover:rounded-lg"
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
              className="flex items-center space-x-5 p-2 w-60 rounded-lg cursor-pointer hover:bg-white hover:text-red-E01414 transition-all duration-300"
              onClick={toggleDropdownMachine}
            >
              <span className="text-xl ml-0.5">
                {React.createElement(GrVirtualMachine)}
              </span>
              <span className="text-sm">Machine</span>
              <span>
                {isDropdownOpenMachine ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            </div>
            {isDropdownOpenMachine && (
              <ul className="mt-2 ml-6 space-y-2 relative">
                {/* Garis Vertikal */}
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-white"></div>

                {SIDEBAR_LINKS.slice(3, 6).map((link, index) => (
                  <li
                    key={link.id}
                    className="flex items-center space-x-4 relative"
                  >
                    {/* Garis Horizontal */}
                    <div className="absolute left-2 top-1/2 w-4 h-0.5 bg-white transform -translate-y-1/2"></div>

                    <Link
                      to={link.path}
                      className={`flex items-center space-x-4 p-2 w-60 rounded-lg transition-all duration-300 ${
                        activeLink === link.id
                          ? "bg-white text-red-E01414 "
                          : "hover:bg-white hover:text-red-E01414"
                      }`}
                      onClick={() => handleLinkClick(link.id)}
                    >
                      <span
                        className={`flex items-center justify-center w-4 h-2 transition-all duration-300 ${
                          activeLink === link.id
                            ? "bg-white text-red-E01414 rounded-lg"
                            : "hover:bg-white hover:text-red-E01414 hover:rounded-lg"
                        }`}
                      >
                        {React.createElement(link.icon)}
                      </span>
                      <span className="text-sm">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Menu Charging & Testing */}
          {SIDEBAR_LINKS.slice(6, 8).map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className={`flex items-center justify-start w-60 space-x-2 transition-all duration-300 ${
                  activeLink === link.id
                    ? "text-red-E01414 bg-white rounded-lg"
                    : "hover:bg-white hover:text-red-E01414 hover:rounded-lg"
                }`}
                onClick={() => handleLinkClick(link.id)}
              >
                <span
                  className={`flex items-center text-xl justify-center w-10 h-10 transition-all duration-300 ${
                    activeLink === link.id
                      ? "bg-white text-red-E01414 rounded-lg"
                      : "hover:bg-white hover:text-red-E01414 hover:rounded-lg"
                  }`}
                >
                  {link.icon()}
                </span>
                <span className="text-sm">{link.name}</span>
              </Link>
            </li>
          ))}

          {/* Dropdown Menu Storage */}
          <li>
            <div
              className="flex items-center space-x-5 p-2 w-60 rounded-lg cursor-pointer hover:bg-white hover:text-red-E01414 transition-all duration-300"
              onClick={toggleDropdownStorage}
            >
              <span className="text-xl ml-0.5">
                {React.createElement(TbHomeBolt)}
              </span>
              <span className="text-sm">Storage Battery</span>
              <span>
                {isDropdownOpenStorage ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            </div>
            {isDropdownOpenStorage && (
              <ul className="mt-2 ml-6 space-y-2 relative">
                {/* Garis Vertikal */}
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-white"></div>

                {SIDEBAR_LINKS.slice(8, 11).map((link, index) => (
                  <li
                    key={link.id}
                    className="flex items-center space-x-4 relative"
                  >
                    {/* Garis Horizontal */}
                    <div className="absolute left-2 top-1/2 w-4 h-0.5 bg-white transform -translate-y-1/2"></div>

                    <Link
                      to={link.path}
                      className={`flex items-center space-x-4 p-2 w-60 rounded-lg transition-all duration-300 ${
                        activeLink === link.id
                          ? "bg-white text-red-E01414"
                          : "hover:bg-white hover:text-red-E01414"
                      }`}
                      onClick={() => handleLinkClick(link.id)}
                    >
                      <span
                        className={`flex items-center justify-center w-4 h-2 transition-all duration-300 ${
                          activeLink === link.id
                            ? "bg-white text-red-E01414 rounded-full"
                            : "hover:bg-white hover:text-red-E01414 hover:rounded-full"
                        }`}
                      >
                        {React.createElement(link.icon)}
                      </span>
                      <span className="text-sm">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
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
