import Dashboard from "../../pages/Dashboard";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar />
      </div>
      <div className="flex-grow ml-16 md:ml-56">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
