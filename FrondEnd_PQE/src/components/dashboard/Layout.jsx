import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          <div className="md:fixed md:left-0 md:-mt-16 md:h-full md:w-auto md:bg-gray-100 md:shadow-md z-10">
            <div
              className={`fixed md:relative md:translate-x-0 top-0 left-0 h-full w-auto bg-gray-100 shadow-md transition-all duration-300 z-20 ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <Sidebar />
            </div>

            {/* Overlay hanya muncul di layar kecil */}
            <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 md:hidden"
              onClick={toggleSidebar}
            />
          </div>
        )}

        {/* Konten Utama */}
        <div
          className={`flex-grow p-4 transition-all duration-300 ${
            isSidebarOpen ? "md:ml-56" : "md:ml-0"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
