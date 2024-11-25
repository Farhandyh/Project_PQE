import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import TextField from '../../components/materialCRUD/TextField';
import Header from '../../components/materialCRUD/Header';

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

  // const fetchMachines = async () => {
  //   try {
  //     const data = await getMachines();
  //     setMachines(data);
  //   } catch (error) {
  //     setError("Error fetching machines data.");
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchMachines = async () => {
    try {
      // Mock data mesin
      const data = [
        {
          idMachine: 1,
          machineName: "Machine A",
          machineType: "Type 1",
          noSeriMachine: "12345",
          arusMaxMachine: "15A",
          serviceLifeMachine: "10 Years",
          machineStatus: 1,
          voltMaxMachine: "220V",
        },
        {
          idMachine: 2,
          machineName: "Machine B",
          machineType: "Type 2",
          noSeriMachine: "67890",
          arusMaxMachine: "20A",
          serviceLifeMachine: "8 Years",
          machineStatus: 0,
          voltMaxMachine: "110V",
        },
        {
          idMachine: 3,
          machineName: "Machine C",
          machineType: "Type 1",
          noSeriMachine: "34567",
          arusMaxMachine: "12A",
          serviceLifeMachine: "15 Years",
          machineStatus: 1,
          voltMaxMachine: "240V",
        },
        {
          idMachine: 4,
          machineName: "Machine D",
          machineType: "Type 3",
          noSeriMachine: "78901",
          arusMaxMachine: "25A",
          serviceLifeMachine: "7 Years",
          machineStatus: 1,
          voltMaxMachine: "220V",
        },
        {
          idMachine: 5,
          machineName: "Machine E",
          machineType: "Type 2",
          noSeriMachine: "89012",
          arusMaxMachine: "30A",
          serviceLifeMachine: "5 Years",
          machineStatus: 0,
          voltMaxMachine: "110V",
        },
        {
          idMachine: 6,
          machineName: "Machine F",
          machineType: "Type 1",
          noSeriMachine: "90123",
          arusMaxMachine: "18A",
          serviceLifeMachine: "12 Years",
          machineStatus: 1,
          voltMaxMachine: "240V",
        },
        {
          idMachine: 7,
          machineName: "Machine G",
          machineType: "Type 3",
          noSeriMachine: "23456",
          arusMaxMachine: "22A",
          serviceLifeMachine: "10 Years",
          machineStatus: 0,
          voltMaxMachine: "220V",
        },
        {
          idMachine: 8,
          machineName: "Machine H",
          machineType: "Type 2",
          noSeriMachine: "34567",
          arusMaxMachine: "24A",
          serviceLifeMachine: "8 Years",
          machineStatus: 1,
          voltMaxMachine: "110V",
        },
        {
          idMachine: 9,
          machineName: "Machine I",
          machineType: "Type 1",
          noSeriMachine: "45678",
          arusMaxMachine: "16A",
          serviceLifeMachine: "11 Years",
          machineStatus: 1,
          voltMaxMachine: "240V",
        },
        {
          idMachine: 10,
          machineName: "Machine J",
          machineType: "Type 3",
          noSeriMachine: "56789",
          arusMaxMachine: "28A",
          serviceLifeMachine: "6 Years",
          machineStatus: 0,
          voltMaxMachine: "220V",
        },
        {
          idMachine: 11,
          machineName: "Machine K",
          machineType: "Type 2",
          noSeriMachine: "67890",
          arusMaxMachine: "26A",
          serviceLifeMachine: "7 Years",
          machineStatus: 1,
          voltMaxMachine: "110V",
        },
        {
          idMachine: 12,
          machineName: "Machine L",
          machineType: "Type 1",
          noSeriMachine: "78901",
          arusMaxMachine: "20A",
          serviceLifeMachine: "13 Years",
          machineStatus: 1,
          voltMaxMachine: "240V",
        },
        {
          idMachine: 13,
          machineName: "Machine M",
          machineType: "Type 3",
          noSeriMachine: "89012",
          arusMaxMachine: "23A",
          serviceLifeMachine: "9 Years",
          machineStatus: 0,
          voltMaxMachine: "220V",
        },
        {
          idMachine: 14,
          machineName: "Machine N",
          machineType: "Type 2",
          noSeriMachine: "90123",
          arusMaxMachine: "19A",
          serviceLifeMachine: "12 Years",
          machineStatus: 1,
          voltMaxMachine: "110V",
        },
        {
          idMachine: 15,
          machineName: "Machine O",
          machineType: "Type 1",
          noSeriMachine: "12345",
          arusMaxMachine: "14A",
          serviceLifeMachine: "10 Years",
          machineStatus: 0,
          voltMaxMachine: "240V",
        },
        {
          idMachine: 16,
          machineName: "Machine P",
          machineType: "Type 3",
          noSeriMachine: "23456",
          arusMaxMachine: "21A",
          serviceLifeMachine: "8 Years",
          machineStatus: 1,
          voltMaxMachine: "220V",
        },
        {
          idMachine: 17,
          machineName: "Machine Q",
          machineType: "Type 2",
          noSeriMachine: "34567",
          arusMaxMachine: "27A",
          serviceLifeMachine: "5 Years",
          machineStatus: 1,
          voltMaxMachine: "110V",
        },
        {
          idMachine: 18,
          machineName: "Machine R",
          machineType: "Type 1",
          noSeriMachine: "45678",
          arusMaxMachine: "17A",
          serviceLifeMachine: "14 Years",
          machineStatus: 0,
          voltMaxMachine: "240V",
        },
        {
          idMachine: 19,
          machineName: "Machine S",
          machineType: "Type 3",
          noSeriMachine: "56789",
          arusMaxMachine: "25A",
          serviceLifeMachine: "9 Years",
          machineStatus: 1,
          voltMaxMachine: "220V",
        },
        {
          idMachine: 20,
          machineName: "Machine T",
          machineType: "Type 2",
          noSeriMachine: "67890",
          arusMaxMachine: "22A",
          serviceLifeMachine: "6 Years",
          machineStatus: 0,
          voltMaxMachine: "110V",
        },
      ];
  
      setMachines(data); // Set data mock ke state
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

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

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

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="mt-4 pl-1 pr-1 flex flex-wrap lg:flex-nowrap lg:pl-8 gap-4 w-full">
          <div className="bg-white rounded-2xl w-full lg:1/3 h-24 p-2 shadow-lg flex flex-row items-start h-auto justify-between overflow-hidden">
            {/* Gambar di sebelah kiri */}
            <img
              src="../src/assets/menuCRUD/machine.png"
              alt="Machine Test Icon"
              className="w-24 h-auto"
            />

            {/* Bagian teks */}
            <div className="flex flex-col justify-center">
              <h3 className="font-poppins text-2xl font-semibold text-red-600 text-center mb-1">
                Machine
              </h3>
              <h1 className="font-poppins text-shadow-custom font-extrabold text-5xl text-red-600 text-center">
                036
              </h1>
            </div>
          </div>

          <div className="bg-white rounded-2xl w-full lg:1/3 h-24 flex flex-row items-start h-auto justify-between items-center p-2 shadow-lg overflow-hidden">
            {/* Bagian Kiri - Dropdown untuk Status dan Role */}
            <div className="flex flex-col space-y-3">
              {/* Dropdown Status */}
              <div className="flex items-center space-x-7">
                <label className="text-gray-600 text-sm font-poppins">
                  Status
                </label>
                <select className="bg-red-500 text-white px-2 py-1 w-28 text-center rounded-lg focus:outline-none">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              {/* Dropdown Role */}
              <div className="flex items-center space-x-9">
                <label className="text-gray-600 text-sm font-poppins">
                  Type
                </label>
                <select className="bg-green-500 text-white px-3 w-28 text-center py-1 rounded-lg focus:outline-none">
                  <option value="type1">Type 1</option>
                  <option value="type2">Type 2</option>
                  <option value="type3">Type 3</option>
                </select>
              </div>
            </div>

            {/* Gambar di sebelah kanan */}
            <img
              src="../src/assets/menuCRUD/filter.png"
              alt="Icon"
              className="w-20 h-auto ml-4 "
            />
          </div>

          <div className="flex items-center justify-center bg-white rounded-2xl w-full lg:1/3 h-24 p-2 shadow-lg overflow-hidden">
            <button
              onClick={toggleModal}
              className="text-white bg-red-500 px-4 py-2 rounded-full"
            >
              Add New Machine
            </button>
          </div>
        </div>
        <div className="w-full lg:pl-8 h-full">
          <div className="rounded-2xl mx-auto pl-10 pt-10 pb-0 pr-10 bg-white">
          <div style={{ overflowX: "auto", width: "100%" }}>
            <table className="min-w-[1000px] w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-red-E01414 text-white">
                  <th className="py-1 px-2 border-b border-r border-gray-300">
                    NO
                  </th>
                  <th className="py-1 px-2 border-b border-r border-gray-300">
                    Machine Name
                  </th>
                  <th className="py-1 px-2 border-b border-r border-gray-300">
                    Machine Type
                  </th>
                  <th className="py-1 px-2 border-b border-r border-gray-300">
                    No Seri
                  </th>
                  <th className="py-1 px-2 border-b border-r border-gray-300">
                    Arus Max
                  </th>
                  <th className="py-1 px-2 border-b border-r border-gray-300">
                    Service Life
                  </th>
                  <th className="py-1 px-2 border-b border-r border-gray-300">
                    Machine Status
                  </th>
                  <th className="py-1 px-2 border-b border-r border-gray-300">
                    Volt Max
                  </th>
                  <th className="py-1 px-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentMachines.map((machine, index) => (
                  <tr
                    key={machine.idMachine}
                    className={`text-center ${index % 2 === 1 ? "" : ""}`}
                    style={{ backgroundColor: index % 2 === 1 ? "#EDD7D7" : "" }}
                  >
                    <td className="py-1 px-2 border-b">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="py-1 px-2 border-b">{machine.machineName}</td>
                    <td className="py-1 px-2 border-b">{machine.machineType}</td>
                    <td className="py-1 px-2 border-b">{machine.noSeriMachine}</td>
                    <td className="py-1 px-2 border-b">{machine.arusMaxMachine}</td>
                    <td className="py-1 px-2 border-b">{machine.serviceLifeMachine}</td>
                    <td className="py-1 px-2 border-b">
                      {machine.machineStatus === 1 ? "Active" : "Non-Active"}
                    </td>
                    <td className="py-1 px-2 border-b">{machine.voltMaxMachine}</td>
                    <td
                      className="py-1 px-2 border-b"
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
        </div>
      </main>
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