import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Dropdown from "../../components/materialCRUD/Dropdown";
import TextField from "../../components/materialCRUD/TextField";
import Header from "../../components/materialCRUD/Header";
import ImageButton from "../../components/materialCRUD/ImageButton";

const getMachines = async () => {
  const response = await fetch("http://localhost:8000/api/testingMachine");
  if (!response.ok) {
    throw new Error("Failed to fetch machine");
  }
  const data = await response.json();
  return data;
};

const deleteMachine = async (idMachine) => {
  const response = await fetch(
    `http://localhost:8000/api/testingMachine-destroy/${idMachine}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete machine");
  }
  return await response.json();
};

const TestingMachine = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [idMachine, setIdMachine] = useState("");
  const [machineName, setMachineName] = useState("");
  const [machineType, setMachineType] = useState("");
  const [noSeriMachine, setNoSeriMachine] = useState("");
  const [arusMaxMachine, setArusMaxMachine] = useState("");
  const [serviceLifeMachine, setServiceLifeMachine] = useState("");
  const [machineStatus, setMachineStatus] = useState("");
  const [voltMaxMachine, setVoltMaxMachine] = useState("");

  // Handler untuk dropdown Capacity
  const [selectedStatus, setSelectedStatus] = useState("active"); // Default status
  const [selectedType, setSelectedType] = useState("all"); // Default capacity

  const fetchMachines = async () => {
    try {
      const data = await getMachines();
      setMachines(data);
    } catch (error) {
      setError("Error fetching machines data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  // Event untuk menampilkan data row yang dipilih dalam form update
  const handleRowClick = (machineData) => {
    setIdMachine(machineData.idMachine);
    setMachineName(machineData.machineName);
    setMachineType(machineData.machineType);
    setNoSeriMachine(machineData.machineType);
    setArusMaxMachine(machineData.machineType);
    setServiceLifeMachine(machineData.machineType);
    setMachineStatus(machineData.machineStatus);
    setVoltMaxMachine(machineData.machineStatus);
    setIsUpdateOpen(true);
  };

  // if (loading) return <p className="text-center">Loading...</p>;
  // if (error) return <p className="text-center text-red-500">{error}</p>;

  const itemsPerPage = 10;
  const totalPages = Math.ceil(machines.length / itemsPerPage);

  const currentMachines = machines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (idMachine) => {
    try {
      await deleteMachine(idMachine);
      setMachines((prevMachine) =>
        prevMachine.filter((machine) => machine.idMachine !== idMachine)
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
        "http://localhost:8000/api/testingMachine-create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idMachine: idMachine,
            machineName: machineName,
            machineType: machineType,
            noSeriMachine: noSeriMachine,
            arusMaxMachine: arusMaxMachine,
            serviceLifeMachine: serviceLifeMachine,
            machineStatus: machineStatus,
            voltMaxMachine: voltMaxMachine,
          }),
        }
      );

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setIdMachine("");
        setMachineName("");
        setMachineType("");
        setNoSeriMachine("");
        setArusMaxMachine("");
        setServiceLifeMachine("");
        setMachineStatus("");
        setVoltMaxMachine("");
        fetchMachines();
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
        "http://localhost:8000/api/testingMachine-update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idMachine: idMachine,
            machineName: machineName,
            machineType: machineType,
            noSeriMachine: noSeriMachine,
            arusMaxMachine: arusMaxMachine,
            serviceLifeMachine: serviceLifeMachine,
            machineStatus: machineStatus,
            voltMaxMachine: voltMaxMachine,
          }),
        }
      );

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setIdMachine("");
        setMachineName("");
        setMachineType("");
        setNoSeriMachine("");
        setArusMaxMachine("");
        setServiceLifeMachine("");
        setMachineStatus("");
        setVoltMaxMachine("");
        fetchMachines();
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
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <>
      <div className="p-5 px-4 mx-auto lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Card Machine */}
          <div className="col-span-1 bg-white rounded-2xl w-full h-32 flex justify-around items-center p-6 shadow-lg border border-gray-700">
            {/* Gambar di sebelah kiri */}
            <img
              src="../src/assets/menuCRUD/machine.png"
              alt="Machine Icon"
              className="w-20 md:w-36 h-auto"
            />

            {/* Bagian teks */}
            <div className="flex flex-col justify-center">
              <h3 className="font-poppins text-lg md:text-2xl text-red-600 text-center font-semibold mb-1">
                Machine
              </h3>
              <h1 className="font-poppins text-shadow-custom font-extrabold text-7xl md:text-7xl text-red-600 text-center">
                036
              </h1>
            </div>
          </div>

          {/* Card Filter */}
          <div className="col-span-1 bg-white rounded-2xl w-full h-32 flex justify-around shadow-lg border border-gray-700">
            {/* Bagian Kiri - Dropdown untuk Status dan Role */}
            <div className="flex flex-col space-y-2 w-full px-4">
              {/* Dropdown Status */}
              <div className="flex flex-col w-full">
                <label className="text-gray-700 text-sm font-semibold text-left">
                  Status
                </label>
                <Dropdown
                  options={[
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                    { value: "suspended", label: "Suspended" },
                  ]}
                  className="bg-red-F81A1B text-white w-full"
                  onChange={handleStatusChange}
                  value={selectedStatus}
                />
              </div>

              {/* Dropdown Material */}
              <div className="flex flex-col w-full">
                <label className="text-gray-700 text-sm font-semibold text-left">
                  Type
                </label>
                <Dropdown
                  options={[
                    { value: "Type1", label: "Type 1" },
                    { value: "Type2", label: "Type 2" },
                    { value: "Type3", label: "Type 3" },
                  ]}
                  className="bg-green-500 text-white w-full"
                  onChange={handleTypeChange}
                  value={selectedType}
                />
              </div>
            </div>
          </div>

          {/* Card Add New Machine */}
          <ImageButton
            imgSrc="../src/assets/menuCRUD/CRUDUser/user3D.png"
            imgAlt="Machine Icon"
            buttonLabel="Add New Machine"
            onClick={toggleModal}
            divClass="col-span-1 p-6 border border-gray-700"
            buttonClass="" // Tambahan styling jika dibutuhkan
          />
        </motion.div>

        <div className="max-w-full pl-4 pr-4 pt-4 pb-4 bg-white rounded-2xl border border-gray-700">
          <div className="overflow-x-auto rounded-lg  max-w-[19.8rem] sm:max-w-[40rem] md:max-w-full shadow">
            <table className="w-full bg-white text-sm md:text-base">
              <thead className="text-center">
                <tr className="bg-red-E01414 text-white">
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    NO
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Machine Name
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Machine Type
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    No Seri
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Arus Max
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Service Life
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Machine Status
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Volt Max
                  </th>
                  <th className="py-2 px-2 border-b tracking-wide whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentMachines.map((machine, index) => (
                  <tr
                    key={machine.idMachine}
                    className={`text-center ${index % 2 === 1 ? "" : ""}`}
                  >
                    <td className="py-2 px-2 border-b">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="py-2 px-2 border-b">
                      {machine.machineName}
                    </td>
                    <td className="py-2 px-2 border-b">
                      {machine.machineType}
                    </td>
                    <td className="py-2 px-2 border-b">
                      {machine.noSeriMachine}
                    </td>
                    <td className="py-2 px-2 border-b">
                      {machine.arusMaxMachine}
                    </td>
                    <td className="py-2 px-2 border-b">
                      {machine.serviceLifeMachine}
                    </td>
                    <td className="py-2 px-2 border-b">
                      {machine.machineStatus === 1 ? "Active" : "Non-Active"}
                    </td>
                    <td className="py-2 px-2 border-b">
                      {machine.voltMaxMachine}
                    </td>
                    <td
                      className="py-2 px-2 border-b"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <a
                        href="#"
                        onClick={() => {
                          toggleUpdate();
                          handleRowClick(machine);
                        }}
                        className="mr-2 mt-2 text-green-700 hover:text-red-E01414"
                      >
                        <FaEdit />
                      </a>
                      <a
                        href="#"
                        onClick={() => handleDelete(machine.idMachine)}
                        className="mr-2 mt-2 text-red-E01414 hover:text-red-E01414"
                      >
                        <FaTrashAlt />
                      </a>
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
              let pageNumber = currentPage + index;

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

      {/* Modal Pop-up Create Machines */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-2xl w-full max-w-[50rem] h-auto p-6 relative">
            {/* Form untuk Add New Machine */}
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
                        htmlFor="id-machine"
                      >
                        Id Machine
                      </label>
                      <TextField
                        id="id-Machine"
                        value={idMachine}
                        onChange={(e) => setIdMachine(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="machine-name"
                      >
                        Machine Name
                      </label>
                      <TextField
                        id="machine-name"
                        value={machineName}
                        onChange={(e) => setMachineName(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="machine-type"
                      >
                        Machine Type
                      </label>
                      <TextField
                        id="machine-type"
                        value={machineType}
                        onChange={(e) => setMachineType(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="machine-status"
                      >
                        Machine Status
                      </label>
                      <TextField
                        id="machine-status"
                        value={machineStatus}
                        onChange={(e) => setMachineStatus(e.target.value)}
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
            {/* Form untuk Add New Machine */}
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
                        htmlFor="id-machine"
                      >
                        Id Machine
                      </label>
                      <TextField
                        id="id-Machine"
                        value={idMachine}
                        onChange={(e) => setIdMachine(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="machine-name"
                      >
                        Machine Name
                      </label>
                      <TextField
                        id="machine-name"
                        value={machineName}
                        onChange={(e) => setMachineName(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="machine-type"
                      >
                        Machine Type
                      </label>
                      <TextField
                        id="machine-type"
                        value={machineType}
                        onChange={(e) => setMachineType(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
                        htmlFor="machine-status"
                      >
                        Machine Status
                      </label>
                      <TextField
                        id="machine-status"
                        value={machineStatus}
                        onChange={(e) => setMachineStatus(e.target.value)}
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

export default TestingMachine;
