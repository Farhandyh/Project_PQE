import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import TextField from "../../components/materialCRUD/TextField";
import Header from "../../components/materialCRUD/Header";
import Dropdown from "../../components/materialCRUD/Dropdown";
import ImageButton from "../../components/materialCRUD/ImageButton";
import "../../styleCss/CRUD/UsersCrud.css";

const getUnits = async () => {
  const response = await fetch("http://localhost:8000/api/units");
  if (!response.ok) {
    throw new Error("Failed to fetch units charging");
  }
  const data = await response.json();
  return data;
};

const deleteUnit = async (idUnitCharge) => {
  const response = await fetch(
    `http://localhost:8000/api/batteries-destroy/${idUnitCharge}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete unit charging");
  }
  return await response.json();
};

const ChargingUnit = () => {
  const [chargingUnit, setChargingUnit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [idUnitCharge, setIdUnitCharge] = useState("");
  const [unitName, setUnitName] = useState("");
  const [noSeriUnit, setNoSeriUnit] = useState("");
  const [averageChargingTime, setAverageChargingTime] = useState("");
  const [connectorTypeUnit, setConnectorType] = useState("");
  const [unitLocation, setUnitLocation] = useState("");
  const [unitStatus, setUnitStatus] = useState("");

  // Handler untuk dropdown Capacity
  const [selectedStatus, setSelectedStatus] = useState("active"); // Default status
  const [selectedCapacity, setSelectedCapacity] = useState("admin"); // Default capacity

  const fetchUnits = async () => {
    try {
      const data = await getUnits();
      setChargingUnit(data);
    } catch (error) {
      setError("Error fetching units charging data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  // Event untuk menampilkan data row yang dipilih dalam form update
  const handleRowClick = (chargingUnit) => {
    setIdUnitCharge(chargingUnit.idUnitCharge);
    setUnitName(chargingUnit.unitName);
    setNoSeriUnit(chargingUnit.noSeriUnit);
    setAverageChargingTime(chargingUnit.averageChargingTime);
    setConnectorType(chargingUnit.connectorTypeUnit);
    setUnitLocation(chargingUnit.unitLocation);
    setUnitStatus(chargingUnit.unitStatus);
    setIsUpdateOpen(true);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const itemsPerPage = 10;
  const totalPages = Math.ceil(chargingUnit.length / itemsPerPage);

  const currentUnits = chargingUnit.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (idUnitCharge) => {
    try {
      await deleteUnits(idUnitCharge);
      setChargingUnit((prevUnits) =>
        prevUnits.filter(
          (ChargingUnit) => ChargingUnit.idUnitCharge !== idUnitCharge
        )
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
      const response = await fetch("http://localhost:8000/api/units-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUnitCharge: idUnitCharge,
          unitName: unitName,
          noSeriUnit: noSeriUnit,
          averageChargingTime: averageChargingTime,
          connectorTypeUnit: connectorTypeUnit,
          unitLocation: unitLocation,
          unitStatus: unitStatus,
        }),
      });

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setIdUnitCharge("");
        setUnitName("");
        setNoSeriUnit("");
        setAverageChargingTime("");
        setConnectorType("");
        setUnitLocation("");
        setUnitStatus("");
        fetchUnits();
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
            idUnitCharge: idUnitCharge,
            unitName: unitName,
            noSeriUnit: noSeriUnit,
            averageChargingTime: averageChargingTime,
            connectorTypeUnit: connectorTypeUnit,
            unitLocation: unitLocation,
            unitStatus: unitStatus,
          }),
        }
      );

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setIdUnitCharge("");
        setUnitName("");
        setNoSeriUnit("");
        setAverageChargingTime("");
        setConnectorType("");
        setUnitLocation("");
        setUnitStatus("");
        fetchUnits();
        toggleUpdate();
      } else {
        alert("Terjadi kesalahan saat menyimpan data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Tidak dapat terhubung ke server.");
    }
  };

  // Handler untuk dropdown Status
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Handler untuk dropdown Capacity
  const handleCapacityChange = (event) => {
    setSelectedCapacity(event.target.value);
  };

  return (
    <>
      <div className="p-5 px-4 mx-auto md:px-20 lg:px-32">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Card Users */}
          <div className="col-span-1 bg-white rounded-2xl w-full h-32 flex justify-around items-center p-6 shadow-lg border border-gray-700">
            {/* Gambar di sebelah kiri */}
            <img
              src="../src/assets/menuCRUD/charging.png"
              alt="Charging Unit Icon"
              className="w-36 h-auto"
            />

            {/* Bagian teks */}
            <div className="flex flex-col justify-center">
              <h3 className="font-poppins text-sm md:text-lg text-red-600 text-center font-semibold mb-1">
                Charging Unit
              </h3>
              <h1 className="font-poppins text-shadow-custom font-extrabold text-7xl md:text-7xl text-red-600 text-center">
                036
              </h1>
            </div>
          </div>

          <div className="col-span-1 bg-white rounded-2xl w-full h-32 flex justify-around shadow-lg border border-gray-700">
            {/* Bagian Kiri - Dropdown untuk Status dan Role */}
            <div className="flex flex-col space-y-2 ">
              {/* Dropdown Status */}
              <Dropdown
                label="Status"
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                  { value: "suspended", label: "Suspended" },
                ]}
                className="bg-red-F81A1B text-white w-full+2 lg:w-full+3"
                classStyle=""
                onChange={handleStatusChange}
                value={selectedStatus}
              />

              {/* Dropdown Capacity */}
              <Dropdown
                label="Capacity"
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "user", label: "User" },
                  { value: "guest", label: "Guest" },
                ]}
                className="bg-green-500 text-white w-full+2 lg:w-full+3"
                onChange={handleCapacityChange}
                value={selectedCapacity}
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
            buttonLabel="Add New Users"
            onClick={toggleModal}
            divClass="col-span-1 p-6 border border-gray-700"
            buttonClass="" // Tambahan styling jika dibutuhkan
          />
        </motion.div>

        <div className="max-w-7xl mx-auto pl-4 pr-4 pt-4 pb-4 bg-white rounded-2xl border border-gray-700">
          {/* Table Wrapper */}
          <div className="overflow-x-auto max-w-[19.8rem] sm:max-w-[40rem] md:max-w-full rounded-lg shadow">
            <table className="w-full bg-white text-sm md:text-base">
              <thead className="text-center">
                <tr className="bg-red-600 text-white">
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    NO
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Unit Name
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Seri Unit
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Charging Time
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Connector Type
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Location
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
                {currentUnits.map((ChargingUnit, index) => (
                  <tr
                    key={ChargingUnit.idUnitCharge}
                    className={`text-center ${
                      index % 2 === 1 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="py-3 px-4 border-b whitespace-nowrap">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="py-3 px-4 border-b whitespace-nowrap">
                      {ChargingUnit.unitName}
                    </td>
                    <td className="py-3 px-4 border-b whitespace-nowrap">
                      {ChargingUnit.noSeriUnit}
                    </td>
                    <td className="py-3 px-4 border-b whitespace-nowrap">
                      {ChargingUnit.averageChargingTime}
                    </td>
                    <td className="py-3 px-4 border-b whitespace-nowrap">
                      {ChargingUnit.connectorTypeUnit}
                    </td>
                    <td className="py-3 px-4 border-b whitespace-nowrap">
                      {ChargingUnit.unitLocation}
                    </td>
                    <td className="py-3 px-4 border-b whitespace-nowrap">
                      {ChargingUnit.unitStatus === 1 ? "Active" : "Non-Active"}
                    </td>
                    <td className="py-3 px-4 border-b whitespace-nowrap">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => {
                            toggleUpdate();
                            handleRowClick(ChargingUnit);
                          }}
                          className="text-green-600 hover:text-green-800"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(ChargingUnit.idUnitCharge)
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-left mt-4 flex-wrap">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 mx-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              } [box-shadow:0_8px_0_#D2D2D4] active:translate-y-[4px] active:[box-shadow:0_4px_0_#D5D6D9]`}
            >
              &lt;
            </button>

            {/* Dynamic Page Buttons */}
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 mx-1 rounded-md ${
                    currentPage === pageNumber
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 mx-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              } [box-shadow:0_8px_0_#D2D2D4] active:translate-y-[4px] active:[box-shadow:0_4px_0_#D5D6D9]`}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Modal Pop-up Create Charger */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-2xl w-full max-w-[50rem] h-auto p-6 relative">
            {/* Form for Add New Charger */}
            <div className="flex flex-col items-center justify-center bg-gray-F5F5F5 rounded-md w-full h-full">
              <Header />
              <div className="mx-auto px-2 bg-white rounded-md w-full max-w-[42rem] h-auto mt-5 mb-6 border border-gray-7006">
                <form onSubmit={handleSubmit} className="w-full mb-2">
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
                        htmlFor="id-unit"
                      >
                        Id Unit
                      </label>
                      <TextField
                        id="id-unit"
                        value={idUnitCharge}
                        onChange={(e) => setIdUnitCharge(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="unit-name"
                      >
                        Unit Name
                      </label>
                      <TextField
                        id="unit-name"
                        value={unitName}
                        onChange={(e) => setUnitName(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                  </motion.div>
                  {/* More form fields here */}
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

      {/* Modal for Update */}
      {isUpdateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-2xl w-full max-w-[50rem] h-auto p-6 relative">
            {/* Form for Update Charger */}
            <div className="flex flex-col items-center justify-center bg-gray-F5F5F5 rounded-md w-full h-full">
              <Header />
              <div className="mx-auto px-2 bg-white rounded-md w-full max-w-[42rem] h-auto mt-5 mb-6 border border-gray-700">
                <form onSubmit={handleUpdate} className="w-full px-6 mb-2">
                  {/* Id Unit and Unit Name Section */}
                  <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 px-6 font-poppins font-extralight mt-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="id-unit"
                      >
                        Id Unit
                      </label>
                      <TextField
                        id="id-unit"
                        value={idUnitCharge}
                        onChange={(e) => setIdUnitCharge(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="unit-name"
                      >
                        Unit Name
                      </label>
                      <TextField
                        id="unit-name"
                        value={unitName}
                        onChange={(e) => setUnitName(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>

                    {/* Seri Unit and Charging Time Section */}
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="seri-unit"
                      >
                        Seri Unit
                      </label>
                      <TextField
                        id="seri-unit"
                        value={noSeriUnit}
                        onChange={(e) => setNoSeriUnit(e.target.value)}
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
                        value={averageChargingTime}
                        onChange={(e) => setAverageChargingTime(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>

                    {/* Connector and Unit Location Section */}
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="connector-type"
                      >
                        Connector
                      </label>
                      <TextField
                        id="connector-type"
                        value={connectorTypeUnit}
                        onChange={(e) => setConnectorType(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="unit-location"
                      >
                        Unit Location
                      </label>
                      <TextField
                        id="unit-location"
                        value={unitLocation}
                        onChange={(e) => setUnitLocation(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>

                    {/* Unit Status Section */}
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="unit-status"
                      >
                        Unit Status
                      </label>
                      <TextField
                        id="unit-status"
                        value={unitStatus}
                        onChange={(e) => setUnitStatus(e.target.value)}
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

export default ChargingUnit;
