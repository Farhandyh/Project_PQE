import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Layout from "./components/dashboard/Layout";
import Dashboard from "./pages/Dashboard";
import Battery from "./pages/crudBattery/Battery";
import Users from "./pages/crudUsers/Users";
import Storage from "./pages/crudStorage/Storage";
import TestingMachine from "./pages/crudMachine/TestingMachine";
import ChargingUnit from "./pages/crudCharger/ChargingUnit";
import Navbar from "./components/monitor/Navbar";
import Monitor from "./pages/Monitor";
import MonitorBattery from "./pages/monitor/monitorBattery";

function App() {
  return (
    <>
      {/* // flex justify-center items-center h-full digunakan untuk memusatkan <Login />secara horizontal dan vertikal. 
            // h-full memastikan bahwa elemen div ini memenuhi tinggi layar sehingga posisi login tetap di tengah.*/}
      {/* <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />       
          <Route path="home" element={<Dashboard />} />   
          <Route path="battery" element={<Battery />} />
          <Route path="users" element={<Users />} />
          <Route path="chargingunit" element={<ChargingUnit />} />
          <Route path="testingmachine" element={<TestingMachine />} />
          <Route path="storage" element={<Storage />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes> */}
      <MonitorBattery/>
      {/* <Monitor/> */}
    </>
  );
}

export default App;
