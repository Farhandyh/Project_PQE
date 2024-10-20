import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Layout from "./components/dashboard/Layout";
import Dashboard from "./pages/Dashboard";
import Battery from "./pages/Battery";

function App() {
  return (
    <>
      {/* // flex justify-center items-center h-full digunakan untuk memusatkan <Login />secara horizontal dan vertikal. 
            // h-full memastikan bahwa elemen div ini memenuhi tinggi layar sehingga posisi login tetap di tengah.*/}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="battery" element={<Battery />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
