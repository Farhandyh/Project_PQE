import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import TextField from "../../components/materialCRUD/TextField";
import Header from "../../components/materialCRUD/Header";

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
      <div className="mt-4 mb-4 ml-0 max-w-7xl flex">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <div className="bg-white mr-4 rounded-2xl w-[1200px] h-48 flex items-center p-2 shadow-lg border border-gray-700"></div>

        <div className="bg-white w-[60%] custom-landscape:w-[85%] h-auto mx-auto mr-4 rounded-2xl shadow-lg border border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-center bg-white rounded-2xl overflow-hidden">
              <thead>
                <tr>
                  <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border border-red-700 py-2">
                    No
                  </th>
                  <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border border-red-700 py-2">
                    Name
                  </th>
                  <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border border-red-700 py-2">
                    Date
                  </th>
                  <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border border-red-700 py-2">
                    Time In
                  </th>
                  <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border border-red-700 py-2">
                    Time Out
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Contoh data statis untuk tabel */}
                <tr className="bg-gray-100 border-b border-gray-200">
                  <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                    1
                  </td>
                  <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                    Battery A
                  </td>
                  <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                    2024-11-29
                  </td>
                  <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                    08:00 AM
                  </td>
                  <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                    05:00 PM
                  </td>
                </tr>
                <tr className="bg-white border-b border-gray-200">
                  <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                    2
                  </td>
                  <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                    Battery B
                  </td>
                  <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                    2024-11-29
                  </td>
                  <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                    09:00 AM
                  </td>
                  <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                    06:00 PM
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white mr-4 rounded-2xl w-[400px] h-48 flex items-center p-2 shadow-lg border border-gray-700"></div>
      </div>

      <div className="grid grid-cols-1 max-w-full mx-8 my-11 p-4 bg-white rounded-2xl border border-gray-700">
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
        <table className="w-full bg-white border border-gray-200 mt-5">
          <thead>
            <tr className="bg-red-E01414 text-white">
              <th className="py-2 px-2 border-b border-r border-gray-300">
                NO
              </th>
              <th className="py-2 px-2 border-b border-r border-gray-300">
                Date
              </th>
              <th className="py-2 px-2 border-b border-r border-gray-300">
                No Motor
              </th>
              <th className="py-2 px-2 border-b border-r border-gray-300">
                Start Time
              </th>
              <th className="py-2 px-2 border-b border-r border-gray-300">
                Finish Time
              </th>
              <th className="py-2 px-2 border-b border-r border-gray-300">
                Duration
              </th>
              <th className="py-2 px-2 border-b border-r border-gray-300">
                kWh Used
              </th>
              <th className="py-2 px-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((ChargingBattery, index) => (
              <tr
                key={ChargingBattery.idCharging}
                className={`text-center ${index % 2 === 1 ? "" : ""}`}
                style={{ backgroundColor: index % 2 === 1 ? "#EDD7D7" : "" }}
              >
                <td className="py-2 px-2 border-b">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="py-2 px-2 border-b">
                  {ChargingBattery.dateCharging}
                </td>
                <td className="py-2 px-2 border-b">
                  {ChargingBattery.noMotor}
                </td>
                <td className="py-2 px-2 border-b">
                  {ChargingBattery.startTime}
                </td>
                <td className="py-2 px-2 border-b">
                  {ChargingBattery.finishTime}
                </td>
                <td className="py-2 px-2 border-b">
                  {ChargingBattery.chargingDuration}
                </td>
                <td className="py-2 px-2 border-b">
                  {ChargingBattery.kWhUsed}
                </td>
                <td
                  className="py-2 px-2 border-b"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <a
                    href="#"
                    onClick={() => {
                      toggleUpdate();
                      handleRowClick(ChargingBattery);
                    }}
                    className="mr-2 mt-2 text-green-700 hover:text-red-E01414"
                  >
                    <FaEdit />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-left mt-2">
          {/* Tombol Previous */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 mx-1 bg-gray-200 rounded-md"
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
            className="px-3 py-1 mx-1 bg-gray-200 rounded-md"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Modal Pop-up Create Charging Data */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[50rem] bg-opacity-0 h-[35rem] p-6 relative">
            {/* Form for Add New Charging Data */}
            <div className="flex flex-col items-center justify-center bg-red-600 rounded-lg w-full h-full">
              <Header />
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl w-[42rem] h-5/6 mt-5 mb-6">
                <form onSubmit={handleSubmit} className="w-full px-6 mb-2">
                  <div className="flex space-x-6">
                    <div className="flex flex-col w-1/2">
                      <label
                        className="block text-black mb-1"
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
                    <div className="flex flex-col w-1/2">
                      <label
                        className="block text-black mb-1"
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
                    <div className="flex flex-col w-1/2">
                      <label
                        className="block text-black mb-1"
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
                    <div className="flex flex-col w-1/2">
                      <label
                        className="block text-black mb-1"
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
                    <div className="flex flex-col w-1/2">
                      <label
                        className="block text-black mb-1"
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
                    <div className="flex flex-col w-1/2">
                      <label
                        className="block text-black mb-1"
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
                    <div className="flex flex-col w-1/2">
                      <label
                        className="block text-black mb-1"
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
                  <div className="flex justify-center mt-10 space-x-10">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={toggleModal}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
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
          <div className="bg-white rounded-2xl w-[50rem] bg-opacity-0 h-[35rem] p-6 relative">
            {/* Form for update charging */}
            <div className="flex flex-col items-center justify-center bg-red-600 rounded-lg w-full h-full">
              <Header />
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl w-[42rem] h-5/6 mt-5 mb-6">
                <form
                  onSubmit={handleUpdate}
                  className="w-full ml-11 mr-4 mb-2"
                >
                  <label
                    className="block text-black ml-2 mb-1 mt-1"
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

                  <TextField
                    id="id-users"
                    value={idUsers}
                    className="w-full mb-4"
                    hidden
                  />

                  <TextField
                    id="id-charging"
                    value={idCharging}
                    className="w-full mb-4"
                    hidden
                  />

                  <label
                    className="block text-black ml-2 mb-1"
                    htmlFor="kWh-used"
                  >
                    kWh Used
                  </label>
                  <TextField
                    id="kWh-used"
                    value={kWhUsed}
                    onChange={(e) => setkWhUsed(e.target.value)}
                    className="w-full mb-4"
                  />

                  <label
                    className="block text-black ml-2 mb-1"
                    htmlFor="finish-time"
                  >
                    Finish Time
                  </label>
                  <TextField
                    id="finish-time"
                    value={finishTime}
                    onChange={(e) => setFinishTime(e.target.value)}
                    className="w-full mb-4"
                  />
                  <br />
                  <div className="rounded-b-3xl w-52 h-11 flex items-center px-2 py-3 ml-4 mt-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-1 rounded-md mr-2 hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={toggleUpdate}
                      className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 ml-24"
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
