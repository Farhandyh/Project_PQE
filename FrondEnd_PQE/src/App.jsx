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
import OptionStorage from "./pages/transactionStorage/optionStorage";
import CheckInBattery from "./pages/transactionStorage/CheckInBattery";
import CheckOutBattery from "./pages/transactionStorage/CheckOutBattery";
import Storage from "./pages/transactionStorage/Storage";
import TestingBattery from "./pages/transactionTesting/TestingBattery";
import ChargingBattery from "./pages/transactionCharging/ChargingBattery";

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

          {/* Halaman Transaksi Storage */}
          <Route path="storage" element={<OptionStorage />} />
          <Route path="storage-checkIn" element={<CheckInBattery />} />
          <Route path="storage-checkOut" element={<CheckOutBattery />} />
          <Route path="storage-history" element={<Storage />} />

          {/* Halaman Transaksi Testing */}
          <Route path="testing" element={<TestingBattery />} />
          
          {/* Halaman Transaksi Charging */}
          <Route path="charging" element={<ChargingBattery />} />
        </Route>

        {/* Redirect ke halaman Monitor jika path tidak dikenali */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
