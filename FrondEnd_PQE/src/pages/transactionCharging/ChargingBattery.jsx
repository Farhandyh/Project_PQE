import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import TextField from "../../components/materialCRUD/TextField";
import Header from "../../components/materialCRUD/Header";
import { Line, Bar } from "react-chartjs-2";
import DailyBatteryTrend from "../../components/dashboardTestingCharging/DailyBatteryTrend";
import BatteryUsage from "../../components/dashboardChargingBattery/BatteryUsage";
import BatteryInOut from "../../components/dashboardChargingBattery/BatteryInOut";
import BatteryStatus from "../../components/dashboardChargingBattery/BatteryStatus";
import TestingGraphLine from "../../components/dashboardTestingCharging/TestingGraphLine";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


import "../../styleCss/DashboardHome/DashboardHome.css";
//Data Dummy
import DailyBatteryUsage from "../../dataDummy/dailyBatteryUsage.json";
import DailyBatteryInOut from "../../dataDummy/dailyBatteryInOut.json";
import DailyBatteryStatus from "../../dataDummy/dailyBatteryStatus.json";
import TestingGrapLine from "../../dataDummy/testingGrapLineData.json";
import ImageButton from "../../components/materialTransaksi/ImageButton";
import SearchComponent from "../../components/materialTransaksi/SearchFilter";
import FilterComponent from "../../components/materialTransaksi/FilterComponent";


const getDataCharging = async () => {
  const response = await fetch("http://localhost:8000/api/charging");
  if (!response.ok) {
    throw new Error("Failed to fetch units charging");
  }
  const data = await response.json();
  return data;
};

const ChargingBattery = () => {
  const [chargingBattery, setChargingBattery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [idCharging, setIdCharging] = useState("");
  const [idUsers, setIdUsers] = useState("");
  const [idBattery, setIdBattery] = useState("");
  const [idUnitCharge, setIdUnitCharge] = useState("");
  const [noMotor, setNoMotor] = useState("");
  const [dateCharging, setDateCharging] = useState("");
  const [startTime, setStartTime] = useState("");
  const [finishTime, setFinishTime] = useState("");
  const [kWhUsed, setkWhUsed] = useState("");

  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Battery Usage (kWh)",
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Battery Usage Over Time",
      },
    },
  };

  // Data for the Stacked Bar Chart
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Charging",
        data: [5, 10, 3, 4, 2, 5],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Discharging",
        data: [3, 5, 2, 3, 1, 2],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Idle",
        data: [4, 7, 1, 2, 3, 4],
        backgroundColor: "rgba(255, 206, 86, 0.6)",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Battery Status Over Time",
      },
    },
    scales: {
      y: {
        stacked: true, // Set stacked to true
      },
      x: {
        stacked: true, // Set stacked to true
      },
    },
  };

  //Filter Table
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  //Filter Table

  //Fungsi Filter Table
  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Search Query:", query);
  };

  const fetchDataCharging = async () => {
    try {
      const data = await getDataCharging();
      setChargingBattery(data);
    } catch (error) {
      setError("Error fetching charging data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataCharging();
  }, []);

  // Event untuk menampilkan data row yang dipilih dalam form update
  const handleRowClick = (chargingBattery) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString("en-US", { hour12: false }); // Format: HH:mm:ss
    const formattedDate = now.toLocaleDateString("en-CA"); // Format: YYYY-MM-DD

    setIdCharging(chargingBattery.idCharging);
    setIdUsers(chargingBattery.idUsers);
    setIdBattery(chargingBattery.idBattery);
    setDateCharging(formattedDate);
    setFinishTime(formattedTime);
    setIsUpdateOpen(true);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const itemsPerPage = 10;
  const totalPages = Math.ceil(chargingBattery.length / itemsPerPage);

  const currentData = chargingBattery.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleModal = () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString("en-US", { hour12: false }); // Format: HH:mm:ss
    const formattedDate = now.toLocaleDateString("en-CA"); // Format: YYYY-MM-DD

    setDateCharging(formattedDate);
    setStartTime(formattedTime);
    setIsModalOpen(!isModalOpen);
  };

  const toggleUpdate = () => setIsUpdateOpen(!isUpdateOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/api/charging-create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idCharging: idCharging,
            idUsers: idUsers,
            idBattery: idBattery,
            idUnitCharge: idUnitCharge,
            noMotor: noMotor,
            dateCharging: dateCharging,
            startTime: startTime,
          }),
        }
      );

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setIdCharging("");
        setIdUsers("");
        setIdBattery("");
        setIdUnitCharge("");
        setNoMotor("");
        setDateCharging("");
        setStartTime("");
        fetchDataCharging();
        toggleModal();
      } else {
        alert("Terjadi kesalahan saat menyimpan data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Tidak dapat terhubung ke server.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/api/charging-update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idCharging: idCharging,
            idUsers: idUsers,
            idBattery: idBattery,
            kWhUsed: kWhUsed,
            finishTime: finishTime,
          }),
        }
      );

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setIdCharging("");
        setIdUsers("");
        setIdBattery("");
        setkWhUsed("");
        setFinishTime("");
        fetchDataCharging();
        toggleUpdate();
      } else {
        alert("Terjadi kesalahan saat menyimpan data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Tidak dapat terhubung ke server.");
    }
  };

  return (
    <>
      <div className="p-5 px-4 mx-auto lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <BatteryUsage
            sourceData={DailyBatteryUsage}
            className="h-full w-full"
          />
          <BatteryInOut
            sourceData={DailyBatteryInOut}
            className="h-full w-full"
          />
          <BatteryStatus
            sourceData={DailyBatteryStatus}
            className="h-full w-full"
          />
        </motion.div>

        <div className="grid grid-cols-1 max-w-full mx-auto pl-4 pr-4 pt-4 pb-4 bg-white rounded-2xl border border-gray-700">
          <div className="grid grid-cols-1 gap-5">
            {/* Card Add New Users */}
            <ImageButton
              imgSrc="../src/assets/menuCRUD/CRUDUser/user3D.png"
              imgAlt="User Icon"
              buttonLabel="Add New Battery"
              onClick={toggleModal}
              divClass="-mt-10"
              buttonClass="" // Tambahan styling jika dibutuhkan
            />

            <div className="grid grid-cols-1 sm:flex space-x-2">
              <SearchComponent
                placeholder="Searching...."
                onSearch={handleSearch}
                buttonLabel="Search"
              />
              <FilterComponent />
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg  max-w-[19.8rem] sm:max-w-[40rem] md:max-w-full shadow">
            <table className="w-full bg-white mt-5 text-sm md:text-base">
              <thead className="text-center">
                <tr className="bg-red-E01414 text-white">
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    NO
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    User ID
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Battery ID
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Machine ID
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Date
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    No Motor
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Start Time
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Finish Time
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    kWh Used
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Charging Duration
                  </th>
                  <th className="py-2 px-2 border-b tracking-wide whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentData.map((ChargingBattery, index) => (
                  <tr
                    key={ChargingBattery.idCharging}
                    className={`text-center ${index % 2 === 1 ? "" : ""}`}
                    style={{
                      backgroundColor: index % 2 === 1 ? "#EDD7D7" : "",
                    }}
                  >
                    <td className="py-2 px-2 border-b">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {ChargingBattery.idUsers}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {ChargingBattery.idBattery}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {ChargingBattery.idUnitCharge}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {ChargingBattery.dateCharging}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {ChargingBattery.noMotor}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {ChargingBattery.startTime}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {ChargingBattery.finishTime}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {ChargingBattery.kWhUsed}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {ChargingBattery.chargingDuration}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      <div className="flex justify-center">
                        <a
                          href="#"
                          onClick={() => {
                            toggleUpdate();
                            handleRowClick(testing);
                          }}
                          className="mr-2 mt-2 text-green-700 hover:text-red-E01414"
                        >
                          <FaEdit />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-left mt-2">
            {/* Tombol Previous */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 mx-1 bg-gray-200 rounded-md [box-shadow:0_8px_0_#D2D2D4] active:translate-y-[4px] active:[box-shadow:0_4px_0_#D5D6D9]"
            >
              &lt;
            </button>

            {/* Tombol halaman dinamis */}
            {Array.from({ length: 3 }, (_, index) => {
              // Hitung halaman mulai berdasarkan halaman saat ini
              let pageNumber = currentPage + index;

              // Pastikan halaman tidak di luar batas 1 dan totalPages
              if (pageNumber == 1) pageNumber = 1;

              return (
                pageNumber <= totalPages && (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 py-1 mx-1 ${
                      currentPage === pageNumber
                        ? "bg-red-E01414 text-white"
                        : "bg-gray-200"
                    } rounded-md`}
                  >
                    {pageNumber}
                  </button>
                )
              );
            })}

            {/* Tombol Next */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 mx-1 bg-gray-200 rounded-md [box-shadow:0_8px_0_#D2D2D4] active:translate-y-[4px] active:[box-shadow:0_4px_0_#D5D6D9]"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Modal Pop-up Create Charging Data */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-2xl w-full max-w-[50rem] h-auto p-6 relative">
            {/* Form for Add New Charging Data */}
            <div className="flex flex-col items-center justify-center bg-gray-F5F5F5 rounded-md w-full h-full">
              <Header />
              <div className="mx-auto px-2 bg-white rounded-md w-full max-w-[42rem] h-auto mt-5 mb-6 border border-gray-700">
                <form onSubmit={handleSubmit} className="w-full px-6 mb-2">
                  {/* STATS */}
                  <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 px-6 font-poppins font-extralight mt-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <div className="flex space-x-6">
                      <div className="flex flex-col">
                        <label
                          className="block font-medium text-black mb-1"
                          htmlFor="id-charging"
                        >
                          Charging ID
                        </label>
                        <TextField
                          id="id-charging"
                          value={idCharging}
                          onChange={(e) => setIdCharging(e.target.value)}
                          className="w-full mb-4"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          className="block font-medium text-black mb-1"
                          htmlFor="id-users"
                        >
                          Users ID
                        </label>
                        <TextField
                          id="id-users"
                          value={idUsers}
                          onChange={(e) => setIdUsers(e.target.value)}
                          className="w-full mb-4"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <div className="flex flex-col">
                        <label
                          className="block font-medium text-black mb-1"
                          htmlFor="id-battery"
                        >
                          Battery ID
                        </label>
                        <TextField
                          id="id-battery"
                          value={idBattery}
                          onChange={(e) => setIdBattery(e.target.value)}
                          className="w-full mb-4"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          className="block font-medium text-black mb-1"
                          htmlFor="id-charger"
                        >
                          Charger ID
                        </label>
                        <TextField
                          id="id-charger"
                          value={idUnitCharge}
                          onChange={(e) => setIdUnitCharge(e.target.value)}
                          className="w-full mb-4"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <div className="flex flex-col">
                        <label
                          className="block font-medium text-black mb-1"
                          htmlFor="date-charging"
                        >
                          Date Charging
                        </label>
                        <TextField
                          id="date-charging"
                          value={dateCharging}
                          onChange={(e) => setDateCharging(e.target.value)}
                          className="w-full mb-4"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          className="block font-medium text-black mb-1"
                          htmlFor="no-motor"
                        >
                          No Motor
                        </label>
                        <TextField
                          id="no-motor"
                          value={noMotor}
                          onChange={(e) => setNoMotor(e.target.value)}
                          className="w-full mb-4"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex flex-col">
                        <label
                          className="block font-medium text-black mb-1"
                          htmlFor="start-time"
                        >
                          Start Time
                        </label>
                        <TextField
                          id="start-time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full mb-4"
                        />
                      </div>
                    </div>
                  </motion.div>
                  <div className="flex justify-center mt-10 space-x-2 mb-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-0 w-full h-8 rounded-md hover:bg-blue-500 [box-shadow:0_6px_0_#1d4ed8] active:translate-y-[3px] active:[box-shadow:0_3px_0_#1d4ed8]"
                    >
                      Save
                    </button>
                    <button
                      onClick={toggleModal}
                      className="bg-red-600 text-white px-0 w-full h-8 rounded-md hover:bg-red-500 [box-shadow:0_6px_0_#b91c1c] active:translate-y-[3px] active:[box-shadow:0_3px_0_#b91c1c]"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* modal untuk update */}
      {isUpdateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-2xl w-full max-w-[50rem] h-auto p-6 relative">
            {/* Form for Update Charging Data */}
            <div className="flex flex-col items-center justify-center bg-gray-F5F5F5 rounded-md w-full h-full">
              <Header />
              <div className="mx-auto px-2 bg-white rounded-md w-full max-w-[42rem] h-auto mt-5 mb-6 border border-gray-700">
                <form onSubmit={handleUpdate} className="w-full px-6 mb-2">
                  {/* STATS */}
                  <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 px-6 font-poppins font-extralight mt-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <div className="flex space-x-6">
                      <div className="flex flex-col">
                        <label
                          className="block font-medium text-black mb-1"
                          htmlFor="id-charging"
                        >
                          Charging ID
                        </label>
                        <TextField
                          id="id-charging"
                          value={idCharging}
                          onChange={(e) => setIdCharging(e.target.value)}
                          className="w-full mb-4"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          className="block font-medium text-black mb-1"
                          htmlFor="id-users"
                        >
                          Users ID
                        </label>
                        <TextField
                          id="id-users"
                          value={idUsers}
                          onChange={(e) => setIdUsers(e.target.value)}
                          className="w-full mb-4"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <div className="flex flex-col">
                        <label
                          className="block font-medium text-black mb-1"
                          htmlFor="id-battery"
                        >
                          Battery ID
                        </label>
                        <TextField
                          id="id-battery"
                          value={idBattery}
                          onChange={(e) => setIdBattery(e.target.value)}
                          className="w-full mb-4"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          className="block font-medium text-black mb-1"
                          htmlFor="id-charger"
                        >
                          Charger ID
                        </label>
                        <TextField
                          id="id-charger"
                          value={idUnitCharge}
                          onChange={(e) => setIdUnitCharge(e.target.value)}
                          className="w-full mb-4"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <div className="flex flex-col">
                        <label
                          className="block font-medium text-black mb-1"
                          htmlFor="date-charging"
                        >
                          Date Charging
                        </label>
                        <TextField
                          id="date-charging"
                          value={dateCharging}
                          onChange={(e) => setDateCharging(e.target.value)}
                          className="w-full mb-4"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          className="block font-medium text-black mb-1"
                          htmlFor="no-motor"
                        >
                          No Motor
                        </label>
                        <TextField
                          id="no-motor"
                          value={noMotor}
                          onChange={(e) => setNoMotor(e.target.value)}
                          className="w-full mb-4"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex flex-col">
                        <label
                          className="block font-medium text-black mb-1"
                          htmlFor="start-time"
                        >
                          Start Time
                        </label>
                        <TextField
                          id="start-time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full mb-4"
                        />
                      </div>
                    </div>
                  </motion.div>
                  <div className="flex justify-center mt-10 space-x-2 mb-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-0 w-full h-8 rounded-md hover:bg-blue-500 [box-shadow:0_6px_0_#1d4ed8] active:translate-y-[3px] active:[box-shadow:0_3px_0_#1d4ed8]"
                    >
                      Save
                    </button>
                    <button
                      onClick={toggleUpdate}
                      className="bg-red-600 text-white px-0 w-full h-8 rounded-md hover:bg-red-500 [box-shadow:0_6px_0_#b91c1c] active:translate-y-[3px] active:[box-shadow:0_3px_0_#b91c1c]"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChargingBattery;
