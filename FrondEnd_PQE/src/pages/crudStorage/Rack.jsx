import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { motion } from "framer-motion";
import TextField from '../../components/materialCRUD/TextField';
import Header from '../../components/materialCRUD/Header';
import Dropdown from "../../components/materialCRUD/Dropdown";
import ImageButton from "../../components/materialCRUD/ImageButton";

const getRacks = async () => {
  const response = await fetch('http://localhost:8000/api/racks');
  if (!response.ok) {
    throw new Error('Failed to fetch racks');
  }
  const data = await response.json();
  return data;
};

const deleteRacks = async (idRack) => {
  const response = await fetch(`http://localhost:8000/api/racks-destroy/${idRack}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete rack');
  }
  return await response.json();
};

const Rack = () => {
  const [racks, setRacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [idRack,setIdRack] = useState("");
  const [rackName,setRackName] = useState("");
  const [rackMaterial,setRackMaterial] = useState("");
  const [weightMaxRack,setWeightMaxRack] = useState("");
  const [rackCapacity,setRackCapacity] = useState("");
  const [rackStatus,setRackStatus] = useState("");

  // Handler untuk dropdown Capacity
  const [selectedStatus, setSelectedStatus] = useState("active"); // Default status
  const [selectedMaterial, setSelectedMaterial] = useState("all"); // Default material

  const fetchRacks = async () => {
    try {
      const data = await getRacks();
      setRacks(data);
    } catch (error) {
      setError("Error fetching racks data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchRacks();
  }, []);
  
  // Event untuk menampilkan data row yang dipilih dalam form update
  const handleRowClick = (rackData) => {
    setIdRack(rackData.idRack);
    setRackName(rackData.rackName);
    setRackMaterial(rackData.rackMaterial);
    setWeightMaxRack(rackData.weightMaxRack);
    setRackCapacity(rackData.rackCapacity);
    setRackStatus(rackData.rackStatus);
    setIsUpdateOpen(true);
  };

  //if (loading) return <p className="text-center">Loading...</p>;
  //if (error) return <p className="text-center text-red-500">{error}</p>;

  const itemsPerPage = 10;
  const totalPages = Math.ceil(racks.length / itemsPerPage);

  const currentRacks = racks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (idRack) => {
    try {
      await deleteRacks(idRack);
      setRacks((prevRacks) =>
        prevRacks.filter((rack) => rack.idRack !== idRack)
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
      const response = await fetch("http://localhost:8000/api/racks-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "idRack" : idRack,
          "rackName" : rackName,
          "rackMaterial" : rackMaterial,
          "weighMaxRack" : weightMaxRack,
          "rackCapacity" : rackCapacity,
          "rackStatus" : rackStatus
        }),
      });

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setIdRack("");
        setRackName("");
        setRackMaterial("");
        setWeightMaxRack("");
        setRackCapacity("");
        setRackStatus("");
        fetchRacks();
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
      const response = await fetch("http://localhost:8000/api/racks-update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "idRack" : idRack,
          "rackName" : rackName,
          "rackMaterial" : rackMaterial,
          "weighMaxRack" : weightMaxRack,
          "rackCapacity" : rackCapacity,
          "rackStatus" : rackStatus
        }),
      });

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setIdRack("");
        setRackName("");
        setRackMaterial("");
        setWeightMaxRack("");
        setRackCapacity("");
        setRackStatus("");
        fetchRacks();
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
  
    // Handler untuk dropdown Material
    const handleMaterialChange = (event) => {
      setSelectedMaterial(event.target.value);
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
          {/* Card Storage */}
          <div className="col-span-1 bg-white rounded-2xl w-full h-32 flex justify-around items-center p-6 shadow-lg border border-gray-700">
            {/* Gambar di sebelah kiri */}
            <img
              src="../src/assets/menuCRUD/storage.png"
              alt="Storage Icon"
              className="w-20 md:w-36 h-auto"
            />

            {/* Bagian teks */}
            <div className="flex flex-col justify-center">
              <h3 className="font-poppins text-lg md:text-2xl text-red-600 text-center font-semibold mb-1">
                Rack
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
                label="Material"
                options={[
                  { value: "material1", label: "Material 1" },
                  { value: "material2", label: "Material 2" },
                  { value: "material3", label: "Material 3" },
                ]}
                className="bg-green-500 text-white w-full+2 lg:w-full+3"
                onChange={handleMaterialChange}
                value={selectedMaterial}
              />
            </div>

            {/* Gambar di sebelah kanan */}
            <img
              src="../src/assets/menuCRUD/storage2.png"
              alt="Icon"
              className="w-auto md:w-32 h-auto mt-4 md:-mt-5 md:h-36 md:ml-5"
            />
          </div>

          {/* Card Add New Storage */}
          <ImageButton
            imgSrc="../src/assets/menuCRUD/CRUDUser/user3D.png"
            imgAlt="Storage Icon"
            buttonLabel="Add New Storage"
            onClick={toggleModal}
            divClass="col-span-1 p-6 border border-gray-700"
            buttonClass="" // Tambahan styling jika dibutuhkan
          />

        </motion.div>
    
        <div className="max-w-7xl mx-auto pl-4 pr-4 pt-4 pb-4 bg-white rounded-2xl border border-gray-700">
          {/* Table Wrapper */}
          <div className="overflow-x-auto max-w-[22rem] sm:max-w-[42rem] md:max-w-full rounded-lg shadow border border-red-500">
            <div className="inline-block min-w-full">
              <div className="overflow-hidden">
                <table className="w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-red-E01414 text-white">
                      <th className="py-1 px-2 border-b border-r border-gray-300">
                        NO
                      </th>
                      <th className="py-1 px-2 border-b border-r border-gray-300">
                        Rack Name
                      </th>
                      <th className="py-1 px-2 border-b border-r border-gray-300">
                        Rack Material
                      </th>
                      <th className="py-1 px-2 border-b border-r border-gray-300">
                        Weight Max
                      </th>
                      <th className="py-1 px-2 border-b border-r border-gray-300">
                        Capacity
                      </th>
                      <th className="py-1 px-2 border-b border-r border-gray-300">
                        Status
                      </th>
                      <th className="py-1 px-2 border-b">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRacks.map((rack, index) => (
                      <tr
                        key={rack.idRack}
                        className={`text-center ${index % 2 === 1 ? "" : ""}`}
                        style={{ backgroundColor: index % 2 === 1 ? "#EDD7D7" : "" }}
                      >
                        <td className="py-1 px-2 border-b">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="py-1 px-2 border-b">{rack.rackName}</td>
                        <td className="py-1 px-2 border-b">{rack.rackMaterial}</td>
                        <td className="py-1 px-2 border-b">{rack.weightMaxRack}</td>
                        <td className="py-1 px-2 border-b">{rack.rackCapacity}</td>
                        <td className="py-1 px-2 border-b">
                          {rack.rackStatus === 1 ? "Active" : "Non-Active"}
                        </td>
                        <td
                          className="py-2 px-2 border-b"
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <a
                            href="#"
                            onClick={() => {
                              toggleUpdate();
                              handleRowClick(rack);
                            }}
                            className="mr-2 mt-2 text-green-700 hover:text-red-E01414"
                          >
                            <FaEdit />
                          </a>
                          <a
                            href="#"
                            onClick={() => handleDelete(rack.idRack)}
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
            </div>
          </div>

          {/* Pagination */}
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
              className="px-3 py-1 mx-1 bg-gray-200 rounded-md"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>


      {/* Modal Pop-up Create Rack */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[90%] md:w-[60rem] lg:w-[50rem] h-auto md:h-[35rem] p-4 sm:p-6 relative">
            {/* Form for Add New Rack */}
            <div className="flex flex-col items-center justify-center bg-red-600 rounded-lg w-full h-full">
              <Header />
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl w-full md:w-[42rem] h-auto md:h-5/6 mt-5 mb-6 p-4">
                <form onSubmit={handleSubmit} className="w-full px-4 mb-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="id-rack">
                        Id Rack
                      </label>
                      <TextField
                        id="id-rack"
                        value={idRack}
                        onChange={(e) => setIdRack(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="rack-name">
                        Rack Name
                      </label>
                      <TextField
                        id="rack-name"
                        value={rackName}
                        onChange={(e) => setRackName(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="rack-material">
                        Material
                      </label>
                      <TextField
                        id="rack-material"
                        value={rackMaterial}
                        onChange={(e) => setRackMaterial(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="weight-max">
                        Weight Max
                      </label>
                      <TextField
                        id="weight-max"
                        value={weightMaxRack}
                        onChange={(e) => setWeightMaxRack(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="rack-capacity">
                        Capacity
                      </label>
                      <TextField
                        id="rack-capacity"
                        value={rackCapacity}
                        onChange={(e) => setRackCapacity(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="rack-status">
                        Status
                      </label>
                      <TextField
                        id="rack-status"
                        value={rackStatus}
                        onChange={(e) => setRackStatus(e.target.value)}
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
            {/* Form for Add New Rack */}
            <div className="flex flex-col items-center justify-center bg-red-600 rounded-lg w-full h-full">
              <Header />
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl w-[42rem] h-5/6 mt-5 mb-6">
                <form onSubmit={handleUpdate} className="w-full px-6 mb-2">
                  <div className="flex space-x-6">
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="id-rack">
                        Id Rack
                      </label>
                      <TextField
                        id="id-rack"
                        value={idRack}
                        onChange={(e) => setIdRack(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="rack-name">
                        Rack Name
                      </label>
                      <TextField
                        id="rack-name"
                        value={rackName}
                        onChange={(e) => setRackName(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="rack-material">
                        Material
                      </label>
                      <TextField
                        id="rack-material"
                        value={rackMaterial}
                        onChange={(e) => setRackMaterial(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="weight-max">
                        Weight Max
                      </label>
                      <TextField
                        id="weight-max"
                        value={weightMaxRack}
                        onChange={(e) => setWeightMaxRack(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="rack-capacity">
                        Capacity
                      </label>
                      <TextField
                        id="rack-capacity"
                        value={rackCapacity}
                        onChange={(e) => setRackCapacity(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="rack-status">
                        Status
                      </label>
                      <TextField
                        id="rack-status"
                        value={rackStatus}
                        onChange={(e) => setRackStatus(e.target.value)}
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
                      onClick={toggleUpdate}
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
    </>
  );
};

export default Rack;