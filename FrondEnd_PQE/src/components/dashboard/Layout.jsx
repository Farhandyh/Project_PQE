import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <h1>layout</h1>
      </div>
      <div className="w-full ml-16 md:ml-56">
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
