import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Sidebar dan Konten */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="fixed top-0 left-0 mt-16 h-full w-64 bg-gray-100 shadow-md z-10">
            <Sidebar />
          </div>
        )}

        {/* Konten Utama */}
        <div
          className={`flex-grow p-4 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
