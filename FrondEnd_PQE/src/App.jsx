import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Layout from "./components/dashboard/Layout";
import Dashboard from "./pages/Dashboard";
import Battery from "./pages/crudBattery/Battery";
import Users from "./pages/crudUsers/Users";
import TestingMachine from "./pages/crudMachine/TestingMachine";
import ChargingUnit from "./pages/crudCharger/ChargingUnit";
import Monitor from "./pages/monitor/MonitorAll";
import MonitorCharging from "./pages/monitor/MonitorCharging";
import MonitorTesting from "./pages/monitor/MonitorTesting";
import MonitorStorage from "./pages/monitor/MonitorStorage";
import LayoutMonitor from "./components/monitor/LayoutMonitor";
import Rack from "./pages/crudStorage/Rack";
import Storage from "./pages/transaction/storage";

function App() {
  return (
    <>
      {/* // flex justify-center items-center h-full digunakan untuk memusatkan <Login />secara horizontal dan vertikal. 
            // h-full memastikan bahwa elemen div ini memenuhi tinggi layar sehingga posisi login tetap di tengah.*/}
      <Routes>
        {/* Halaman awal Monitor */}
        <Route path="/" element={<LayoutMonitor />}>
          <Route index element={<Monitor />} />
          <Route path="/monitor" element={<Monitor />} />

          {/* Sub-halaman dalam Monitor */}
          <Route path="/MonitorCharging" element={<MonitorCharging />} />
          <Route path="/MonitorTesting" element={<MonitorTesting />} />
          <Route path="/MonitorStorage" element={<MonitorStorage />} />
        </Route>

        {/* Halaman Login */}
        <Route path="/login" element={<Login />} />

        {/* Halaman Dashboard setelah login */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="home" element={<Dashboard />} />

          {/* Halaman CRUD Battery */}
          <Route path="battery" element={<Battery />} />

          <Route path="users" element={<Users />} />
          <Route path="chargingunit" element={<ChargingUnit />} />
          <Route path="testingmachine" element={<TestingMachine />} />
          <Route path="rack" element={<Rack />} />
          <Route path="storage" element={<Storage />} />
        </Route>

        {/* Redirect ke halaman Monitor jika path tidak dikenali */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
