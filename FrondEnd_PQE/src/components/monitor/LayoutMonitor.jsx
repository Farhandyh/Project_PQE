import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const LayoutMonitor = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutMonitor;
