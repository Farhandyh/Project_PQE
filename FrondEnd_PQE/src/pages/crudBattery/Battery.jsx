import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import TextField from "../../components/materialCRUD/TextField";
import Header from "../../components/materialCRUD/Header";
import { motion } from "framer-motion";
import Dropdown from "../../components/materialCRUD/Dropdown";
import ImageButton from "../../components/materialCRUD/ImageButton";

const getBatteries = async () => {
  const response = await fetch("http://localhost:8000/api/batteries");
  if (!response.ok) {
    throw new Error("Failed to fetch batteries");
  }
  const data = await response.json();
  return data;
};

const deleteBattery = async (idBattery) => {
  const response = await fetch(
    `http://localhost:8000/api/batteries-destroy/${idBattery}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete battery");
  }
  return await response.json();
};

const Battery = () => {
  const [batteries, setBatteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [idBattery, setIdBattery] = useState("");
  const [noSeriBattery, setNoSeriBattery] = useState("");
  const [batteryMerk, setBatteryMerk] = useState("");
  const [batteryModel, setBatteryModel] = useState("");
  const [batteryDayaMax, setBatteryDayaMax] = useState("");
  const [batteryChargingTime, setBatteryChargingTime] = useState("");
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [batteryStatus, setBatteryStatus] = useState("");

  //Use State Filter
  // Handler untuk dropdown Capacity
  const [selectedMerk, setSelectedMerk] = useState("active"); // Default Merk
  const [selectedModel, setSelectedModel] = useState("admin"); // Default Model

  const fetchBatteries = async () => {
    try {
      const data = await getBatteries();
      setBatteries(data);
    } catch (error) {
      setError("Error fetching batteries data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatteries();
  }, []);

  // Event untuk menampilkan data row yang dipilih dalam form update
  const handleRowClick = (batteryData) => {
    setIdBattery(batteryData.idBattery);
    setNoSeriBattery(batteryData.noSeriBattery);
    setBatteryMerk(batteryData.batteryMerk);
    setBatteryModel(batteryData.batteryModel);
    setBatteryDayaMax(batteryData.batteryDayaMax);
    setBatteryChargingTime(batteryData.batteryChargingTime);
    setBatteryCapacity(batteryData.batteryCapacity);
    setBatteryStatus(batteryData.batteryStatus);
    setIsUpdateOpen(true);
  };

  // if (loading) return <p className="text-center">Loading...</p>;
  // if (error) return <p className="text-center text-red-500">{error}</p>;

  const itemsPerPage = 10;
  const totalPages = Math.ceil(batteries.length / itemsPerPage);

  const currentBatteries = batteries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (idBattery) => {
    try {
      await deleteBattery(idBattery);
      setBatteries((prevBatteries) =>
        prevBatteries.filter((battery) => battery.idBattery !== idBattery)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  // Toggle modal open/close
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleUpdate = () => setIsUpdateOpen(!isUpdateOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/api/batteries-create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idBattery: idBattery,
            noSeriBattery: noSeriBattery,
            batteryMerk: batteryMerk,
            batteryModel: batteryModel,
            batteryDayaMax: batteryDayaMax,
            batteryChargingTime: batteryChargingTime,
            batteryCapacity: batteryCapacity,
            batteryStatus: batteryStatus,
          }),
        }
      );

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setIdBattery("");
        setNoSeriBattery("");
        setBatteryMerk("");
        setBatteryModel("");
        setBatteryDayaMax("");
        setBatteryChargingTime("");
        setBatteryCapacity("");
        setBatteryStatus("");
        fetchBatteries();
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
        "http://localhost:8000/api/batteries-update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idBattery: idBattery,
            noSeriBattery: noSeriBattery,
            batteryMerk: batteryMerk,
            batteryModel: batteryModel,
            batteryDayaMax: batteryDayaMax,
            batteryChargingTime: batteryChargingTime,
            batteryCapacity: batteryCapacity,
            batteryStatus: batteryStatus,
          }),
        }
      );

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setIdBattery("");
        setNoSeriBattery("");
        setBatteryMerk("");
        setBatteryModel("");
        setBatteryDayaMax("");
        setBatteryChargingTime("");
        setBatteryCapacity("");
        setBatteryStatus("");
        fetchBatteries();
        toggleUpdate();
      } else {
        alert("Terjadi kesalahan saat menyimpan data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Tidak dapat terhubung ke server.");
    }
  };

  // Handler untuk dropdown Merk
  const handleMerkChange = (event) => {
    setSelectedMerk(event.target.value);
  };

  // Handler untuk dropdown Model
  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  return (
    <>
      <div className="p-5 mx-auto px-4 md:px-20  lg:px-32">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="col-span-1 bg-white rounded-2xl w-full h-32 flex justify-around items-center p-6 shadow-lg border border-gray-700">
            {/* Gambar di sebelah kiri */}
            <img
              src="../src/assets/menuCRUD/battery.png"
              alt="Battery Icon"
              className="w-36 h-auto"
            />
            {/* Bagian teks */}
            <div className="flex flex-col justify-center">
              <h3 className="font-poppins text-lg md:text-2xl text-red-600 text-center font-semibold mb-1">
                Battery
              </h3>
              <h1 className="font-poppins text-shadow-custom font-extrabold text-7xl md:text-7xl text-red-600 text-center">
                036
              </h1>
            </div>
          </div>

          {/* Card Filter */}
          <div className=" col-span-1 bg-white rounded-2xl w-full h-32 flex justify-around shadow-lg border border-gray-700">
            {/* Bagian Kiri - Dropdown untuk Status dan Role */}
            <div className="flex flex-col space-y-2 ">
              {/* Dropdown Status */}
              <Dropdown
                label="Merk"
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                  { value: "suspended", label: "Suspended" },
                ]}
                className="bg-red-F81A1B text-white w-full+2 lg:w-full+3"
                classStyle=""
                onChange={handleMerkChange}
                value={selectedMerk}
              />

              {/* Dropdown Capacity */}
              <Dropdown
                label="Model"
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "user", label: "User" },
                  { value: "guest", label: "Guest" },
                ]}
                className="bg-green-500 text-white w-full+2 lg:w-full+3"
                onChange={handleModelChange}
                value={selectedModel}
              />
            </div>

            {/* Gambar di sebelah kanan */}
            <img
              src="../src/assets/menuCRUD/filter.png"
              alt="Icon"
              className="w-auto md:w-32 h-auto mt-4 md:-mt-5 md:h-36 md:ml-5"
            />
          </div>

          {/* Card Add New Users */}
          <ImageButton
            imgSrc="../src/assets/menuCRUD/CRUDUser/user3D.png"
            imgAlt="User Icon"
            buttonLabel="Add New Battery"
            onClick={toggleModal}
            divClass="col-span-1 p-6 border border-gray-700"
            buttonClass="" // Tambahan styling jika dibutuhkan
          />
        </motion.div>

        <div className="max-w-7xl mx-auto pl-4 pr-4 pt-4 pb-4 bg-white rounded-2xl border border-gray-700">
          <div className="overflow-x-auto rounded-lg  max-w-[19.8rem] sm:max-w-[40rem] md:max-w-full shadow">
            <table className="w-full bg-white text-sm md:text-base">
              <thead className="text-center">
                <tr className="bg-red-E01414 text-white">
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    NO
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Seri Battery
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Merk
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Model
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Daya Max
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Charging Time
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Capacity
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Status
                  </th>
                  <th className="py-2 px-2 border-b tracking-wide whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentBatteries.map((battery, index) => (
                  <tr
                    key={battery.idBattery}
                    className={`text-center ${
                      index % 2 === 1 ? "bg-gray-100" : ""
                    }`}
                  >
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {battery.noSeriBattery}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {battery.batteryMerk}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {battery.batteryModel}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {battery.batteryDayaMax}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {battery.batteryChargingTime}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {battery.batteryCapacity}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {battery.batteryStatus === 1 ? "Active" : "Non-Active"}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      <div className="flex justify-center">
                        <a
                          href="#"
                          onClick={() => {
                            toggleUpdate();
                            handleRowClick(battery);
                          }}
                          className="mr-2 mt-2 text-green-700 hover:text-red-E01414"
                        >
                          <FaEdit />
                        </a>
                        <a
                          href="#"
                          onClick={() => handleDelete(battery.idBattery)}
                          className="mr-2 mt-2 text-red-E01414 hover:text-red-E01414"
                        >
                          <FaTrashAlt />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-left mt-4 flex-wrap">
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

      {/* Modal Pop-up Create Battery */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-2xl w-full max-w-[50rem] h-auto p-6 relative">
            {/* Form for Add New Battery */}
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
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="id-battery"
                      >
                        Id Battery
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
                        htmlFor="seri-battery"
                      >
                        Seri Battery
                      </label>
                      <TextField
                        id="seri-battery"
                        value={noSeriBattery}
                        onChange={(e) => setNoSeriBattery(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="battery-merk"
                      >
                        Merk
                      </label>
                      <TextField
                        id="battery-merk"
                        value={batteryMerk}
                        onChange={(e) => setBatteryMerk(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="battery-model"
                      >
                        Model
                      </label>
                      <TextField
                        id="battery-model"
                        value={batteryModel}
                        onChange={(e) => setBatteryModel(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="daya-max"
                      >
                        Daya Max
                      </label>
                      <TextField
                        id="daya-max"
                        value={batteryDayaMax}
                        onChange={(e) => setBatteryDayaMax(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="charging-time"
                      >
                        Charging Time
                      </label>
                      <TextField
                        id="charging-time"
                        value={batteryChargingTime}
                        onChange={(e) => setBatteryChargingTime(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="battery-capacity"
                      >
                        Capacity
                      </label>
                      <TextField
                        id="battery-capacity"
                        value={batteryCapacity}
                        onChange={(e) => setBatteryCapacity(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="battery-status"
                      >
                        Status
                      </label>
                      <TextField
                        id="battery-status"
                        value={batteryStatus}
                        onChange={(e) => setBatteryStatus(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                  </motion.div>

                  {/* Buttons */}
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
          <div className=" rounded-2xl w-full max-w-[50rem] h-auto p-6 relative">
            {/* Form for Add New Battery */}
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
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="id-battery"
                      >
                        Id Battery
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
                        htmlFor="seri-battery"
                      >
                        Seri Battery
                      </label>
                      <TextField
                        id="seri-battery"
                        value={noSeriBattery}
                        onChange={(e) => setNoSeriBattery(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="battery-merk"
                      >
                        Merk
                      </label>
                      <TextField
                        id="battery-merk"
                        value={batteryMerk}
                        onChange={(e) => setBatteryMerk(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="battery-model"
                      >
                        Model
                      </label>
                      <TextField
                        id="battery-model"
                        value={batteryModel}
                        onChange={(e) => setBatteryModel(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="daya-max"
                      >
                        Daya Max
                      </label>
                      <TextField
                        id="daya-max"
                        value={batteryDayaMax}
                        onChange={(e) => setBatteryDayaMax(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="charging-time"
                      >
                        Charging Time
                      </label>
                      <TextField
                        id="charging-time"
                        value={batteryChargingTime}
                        onChange={(e) => setBatteryChargingTime(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="battery-capacity"
                      >
                        Capacity
                      </label>
                      <TextField
                        id="battery-capacity"
                        value={batteryCapacity}
                        onChange={(e) => setBatteryCapacity(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="battery-status"
                      >
                        Status
                      </label>
                      <TextField
                        id="battery-status"
                        value={batteryStatus}
                        onChange={(e) => setBatteryStatus(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                  </motion.div>

                  {/* Buttons */}
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

export default Battery;
