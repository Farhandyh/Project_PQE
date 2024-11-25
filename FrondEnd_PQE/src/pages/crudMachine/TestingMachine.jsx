import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { motion } from "framer-motion";
import Dropdown from "../../components/materialCRUD/Dropdown";
import TextField from '../../components/materialCRUD/TextField';
import Header from '../../components/materialCRUD/Header';
import ImageButton from "../../components/materialCRUD/ImageButton";

const getMachines = async () => {
  const response = await fetch('http://localhost:8000/api/testingMachine');
  if (!response.ok) {
    throw new Error('Failed to fetch batteries');
  }
  const data = await response.json();
  return data;
};

const deleteMachine = async (idMachine) => {
  const response = await fetch(`http://localhost:8000/api/testingMachine-destroy/${idMachine}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete machine');
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
  const [idMachine,setIdMachine] = useState("");
  const [machineName,setMachineName] = useState("");
  const [machineType,setMachineType] = useState("");
  const [noSeriMachine,setNoSeriMachine] = useState("");
  const [arusMaxMachine,setArusMaxMachine] = useState("");
  const [serviceLifeMachine,setServiceLifeMachine] = useState("");
  const [machineStatus,setMachineStatus] = useState("");
  const [voltMaxMachine,setVoltMaxMachine] = useState("");

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
      const response = await fetch("http://localhost:8000/api/testingMachine-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "idMachine" : idMachine,
          "machineName" : machineName,
          "machineType" : machineType,
          "noSeriMachine" : noSeriMachine,
          "arusMaxMachine" : arusMaxMachine,
          "serviceLifeMachine" : serviceLifeMachine,
          "machineStatus" : machineStatus,
          "voltMaxMachine" : voltMaxMachine
        }),
      });

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
      }
       else {
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
      const response = await fetch("http://localhost:8000/api/testingMachine-update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "idMachine" : idMachine,
          "machineName" : machineName,
          "machineType" : machineType,
          "noSeriMachine" : noSeriMachine,
          "arusMaxMachine" : arusMaxMachine,
          "serviceLifeMachine" : serviceLifeMachine,
          "machineStatus" : machineStatus,
          "voltMaxMachine" : voltMaxMachine
        }),
      });

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
      }
       else {
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
      <div className="p-5 px-4 mx-auto md:px-20 lg:px-32">
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
          <div className=" col-span-1 bg-white rounded-2xl w-full h-32 flex justify-around shadow-lg border border-gray-700">
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

              {/* Dropdown Material */}
              <Dropdown
                label="Type"
                options={[
                  { value: "Type1", label: "Type 1" },
                  { value: "Type2", label: "Type 2" },
                  { value: "Type3", label: "Type 3" },
                ]}
                className="bg-green-500 text-white w-full+2 lg:w-full+3"
                onChange={handleTypeChange}
                value={selectedType}
              />
            </div>

            {/* Gambar di sebelah kanan */}
            <img
              src="../src/assets/menuCRUD/power.png"
              alt="Icon"
              className="w-auto md:w-32 h-auto mt-4 md:-mt-5 md:h-36 md:ml-5"
            />
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
        
        <div className="max-w-7xl mx-auto pl-4 pr-4 pt-4 pb-4 bg-white rounded-2xl border border-gray-700">
          <div className="overflow-x-auto rounded-lg  max-w-[19.8rem] sm:max-w-[40rem] md:max-w-full shadow">
            <table className="w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-red-E01414 text-white">
                      <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide">
                        NO
                      </th>
                      <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide">
                        Machine Name
                      </th>
                      <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide">
                        Machine Type
                      </th>
                      <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide">
                        No Seri
                      </th>
                      <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide">
                        Arus Max
                      </th>
                      <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide">
                        Service Life
                      </th>
                      <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide">
                        Machine Status
                      </th>
                      <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide">
                        Volt Max
                      </th>
                      <th className="py-2 px-2 border-b tracking-wide">Action</th>
                    </tr>
                  </thead>
                  <tbody  className="divide-y divide-gray-100">
                    {currentMachines.map((machine, index) => (
                      <tr
                        key={machine.idMachine}
                        className={`text-center ${index % 2 === 1 ? "" : ""}`}
                      >
                        <td className="py-2 px-2 border-b">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="py-2 px-2 border-b">{machine.machineName}</td>
                        <td className="py-2 px-2 border-b">{machine.machineType}</td>
                        <td className="py-2 px-2 border-b">{machine.noSeriMachine}</td>
                        <td className="py-2 px-2 border-b">{machine.arusMaxMachine}</td>
                        <td className="py-2 px-2 border-b">{machine.serviceLifeMachine}</td>
                        <td className="py-2 px-2 border-b">
                          {machine.machineStatus === 1 ? "Active" : "Non-Active"}
                        </td>
                        <td className="py-2 px-2 border-b">{machine.voltMaxMachine}</td>
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
            
          <div className="flex justify-center mt-4 flex-wrap">
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
      </div>
      
      {/* Modal Pop-up Create Machines */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-96 h-auto bg-opacity-0 p-6 relative">
            {/* Form untuk Add New Machine */}
            <div className="flex flex-col items-center justify-center bg-red-600 rounded-lg w-96 h-full">
              <Header />
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl w-80 h-80 mt-5 mb-6">
                <form onSubmit={handleSubmit} className="w-full ml-11 mb-2">
                  <label
                    className="block text-black ml-2 mb-1 mt-3"
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

                  <label
                    className="block text-black ml-2 mb-1"
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

                  <label
                    className="block text-black ml-2 mb-1"
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

                  <label
                    className="block text-black ml-2 mb-1"
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
                  <br />
                  <div className="rounded-b-3xl w-52 h-11 flex items-center px-2 py-3 mt-2">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-1 rounded-md mr-2 hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={toggleModal}
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

      {/* modal untuk update */}
      {isUpdateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-96 h-auto bg-opacity-0 p-6  relative">
            {/* Form untuk upadate Machine */}
            <div className="flex flex-col items-center justify-center bg-red-600 rounded-lg w-96 h-full">
              <Header />
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl w-80 h-80 mt-5 mb-6">
                <form onSubmit={handleUpdate} className="w-full ml-11 mb-2">
                  <label
                    className="block text-black ml-2 mb-1 mt-3"
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

                  <label
                    className="block text-black ml-2 mb-1"
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

                  <label
                    className="block text-black ml-2 mb-1"
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

                  <label
                    className="block text-black ml-2 mb-1"
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
                  <br />
                  <div className="rounded-b-3xl w-52 h-11 flex items-center px-2 py-3 mt-2">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-1 rounded-md mr-2 hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={toggleModal}
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

export default TestingMachine;