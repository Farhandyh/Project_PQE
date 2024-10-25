//ICONS //
import { LuUser, LuLayoutDashboard} from "react-icons/lu";
import { FaBatteryFull, FaCarBattery, FaChargingStation} from "react-icons/fa";
import { GrStorage } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiOutlineLogin } from "react-icons/hi";
//ICONS //

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const handleLinkClick = (index) => {
    setActiveLink(index);
  };
  const SIDEBAR_LINKS = [
    { id: 1, path: "/dashboard/home", name: "Dashboard", icon: LuLayoutDashboard },
    { id: 2, path: "/dashboard/users", name: "Users", icon: LuUser },
    { id: 3, path: "/dashboard/battery", name: "Battery", icon: FaBatteryFull },
    { id: 4, path: "/dashboard/storage", name: "Storage", icon: GrStorage },
    { id: 5, path: "/dashboard/chargingunit", name: "Charging Unit", icon: FaChargingStation  },
    { id: 6, path: "/dashboard/testingmachine", name: "Testing Machine", icon:  FaCarBattery},
  ];
  return (
    <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen bg-red-E01414 rounded-r-3xl" style={{filter:'drop-shadow(2px , 1px, 1px, red)'}}>
      {/* { Logo } */}
      <div className="left-0 top-0 h-32 bg-white rounded-tr-3xl">
        <img src="/Honda_Logo.png" alt="logo" className="pt-8 px-4 mb-10 ml-7 w-40 hidden md:flex" />
        <img src="/Honda_Logo.png" alt="logo" className="pt-8 px-4 mb-10 ml-7 w-8 flex md:hidden" />
      </div>
      {/* { Logo } */}

      {/* Navigation Links */}
      <ul className="mt-6 space-y-6 text-white pt-8 px-4">
        {SIDEBAR_LINKS.map((link, index) => (
          <li
          key={index}
          className={`font-medium rounded-md py-2 px-5 hover:bg-white hover:text-red-E01414 ${
            activeLink === index
              ? "bg-white text-red-E01414 pr-0 rounded-r-none"  // Atur padding-right dan hilangkan border-radius kanan
              : ""
          }`}
          >
            <Link
              to={link.path}
              className="flex justify-center md:justify-start items-center md:space-x-6"
              onClick={() => handleLinkClick(index)}
            >
              <span>{link.icon()}</span>
              <span className="text-sm hidden md:flex">
                {link.name} 
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {/* Navigation Links */}

      <a href="/login">
        <div className="w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center">
          <p className="flex items-center space-x-2 text-s text-white font-bold py-2 px-5 hover:bg-white rounded-full hover:text-red-E01414" path="/login">
            {/* {logo logOut} */}
            <HiOutlineLogin />
            {/* Sembunyikan teks pada layar kecil, tampilkan hanya pada layar medium ke atas */}
            <span className="hidden md:inline">Log Out</span>
          </p>
        </div>
      </a>
    </div>
  );
};

export default Sidebar;