import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import TextField from '../../components/materialCRUD/TextField';
import Header from '../../components/materialCRUD/Header';

// const getRacks = async () => {
//   const response = await fetch('http://localhost:8000/api/racks');
//   if (!response.ok) {
//     throw new Error('Failed to fetch racks');
//   }
//   const data = await response.json();
//   return data;
// };

const getRacks = async () => {
  // Data statis sebagai pengganti API
  const data = [
    {
      idRack: "1",
      rackName: "Rack A",
      rackMaterial: "Steel",
      weightMaxRack: 200,
      rackCapacity: 50,
      rackStatus: 1,
    },
    {
      idRack: "2",
      rackName: "Rack B",
      rackMaterial: "Aluminum",
      weightMaxRack: 150,
      rackCapacity: 30,
      rackStatus: 0,
    },
    {
      idRack: "3",
      rackName: "Rack C",
      rackMaterial: "Wood",
      weightMaxRack: 100,
      rackCapacity: 20,
      rackStatus: 1,
    },
    {
      idRack: "4",
      rackName: "Rack D",
      rackMaterial: "Plastic",
      weightMaxRack: 80,
      rackCapacity: 15,
      rackStatus: 1,
    },
    {
      idRack: "5",
      rackName: "Rack E",
      rackMaterial: "Steel",
      weightMaxRack: 250,
      rackCapacity: 60,
      rackStatus: 0,
    },
    {
      idRack: "6",
      rackName: "Rack F",
      rackMaterial: "Aluminum",
      weightMaxRack: 120,
      rackCapacity: 25,
      rackStatus: 1,
    },
    {
      idRack: "7",
      rackName: "Rack G",
      rackMaterial: "Wood",
      weightMaxRack: 90,
      rackCapacity: 18,
      rackStatus: 0,
    },
    {
      idRack: "8",
      rackName: "Rack H",
      rackMaterial: "Steel",
      weightMaxRack: 300,
      rackCapacity: 70,
      rackStatus: 1,
    },
    {
      idRack: "9",
      rackName: "Rack I",
      rackMaterial: "Plastic",
      weightMaxRack: 70,
      rackCapacity: 10,
      rackStatus: 1,
    },
    {
      idRack: "10",
      rackName: "Rack J",
      rackMaterial: "Steel",
      weightMaxRack: 220,
      rackCapacity: 55,
      rackStatus: 0,
    },
    {
      idRack: "11",
      rackName: "Rack K",
      rackMaterial: "Aluminum",
      weightMaxRack: 140,
      rackCapacity: 35,
      rackStatus: 1,
    },
    {
      idRack: "12",
      rackName: "Rack L",
      rackMaterial: "Wood",
      weightMaxRack: 95,
      rackCapacity: 22,
      rackStatus: 0,
    },
    {
      idRack: "13",
      rackName: "Rack M",
      rackMaterial: "Steel",
      weightMaxRack: 280,
      rackCapacity: 65,
      rackStatus: 1,
    },
    {
      idRack: "14",
      rackName: "Rack N",
      rackMaterial: "Plastic",
      weightMaxRack: 75,
      rackCapacity: 12,
      rackStatus: 1,
    },
    {
      idRack: "15",
      rackName: "Rack O",
      rackMaterial: "Steel",
      weightMaxRack: 260,
      rackCapacity: 58,
      rackStatus: 0,
    },
    {
      idRack: "16",
      rackName: "Rack P",
      rackMaterial: "Aluminum",
      weightMaxRack: 160,
      rackCapacity: 40,
      rackStatus: 1,
    },
    {
      idRack: "17",
      rackName: "Rack Q",
      rackMaterial: "Wood",
      weightMaxRack: 110,
      rackCapacity: 27,
      rackStatus: 0,
    },
    {
      idRack: "18",
      rackName: "Rack R",
      rackMaterial: "Steel",
      weightMaxRack: 310,
      rackCapacity: 75,
      rackStatus: 1,
    },
    {
      idRack: "19",
      rackName: "Rack S",
      rackMaterial: "Plastic",
      weightMaxRack: 85,
      rackCapacity: 13,
      rackStatus: 1,
    },
    {
      idRack: "20",
      rackName: "Rack T",
      rackMaterial: "Steel",
      weightMaxRack: 240,
      rackCapacity: 52,
      rackStatus: 0,
    },
  ];
  return data; // Simulasikan data seolah-olah diambil dari API
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

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

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

  return (
    <>
      <div className="mt-4 mb-4 pl-1 pr-1 flex flex-wrap lg:flex-nowrap lg:pl-8  gap-4 w-full">
        <div className="bg-white rounded-2xl w-full lg:1/3 h-32 p-2 shadow-lg flex flex-row items-start h-auto justify-between overflow-hidden">
          {/* Gambar di sebelah kiri */}
          <img
            src="../src/assets/menuCRUD/storage.png"
            alt="Storage Icon"
            className="w-36 h-auto"
          />

          {/* Bagian teks */}
          <div className="flex flex-col justify-center">
            <h3 className="font-poppins text-2xl font-semibold text-red-600 text-center mb-1">
              Storage
            </h3>
            <h1 className="font-poppins text-shadow-custom font-extrabold text-7xl text-red-600 text-center">
              036
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl w-full lg:1/3 h-32 flex flex-row items-start h-auto justify-between items-center p-2 shadow-lg overflow-hidden">
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
            <div className="flex items-center space-x-3">
              <label className="text-gray-600 text-sm font-poppins">
                Capacity
              </label>
              <select className="bg-green-500 text-white px-2 w-28 text-center py-1 rounded-lg focus:outline-none">
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="guest">Guest</option>
              </select>
            </div>
          </div>

          {/* Gambar di sebelah kanan */}
          <img
            src="../src/assets/menuCRUD/filter.png"
            alt="Icon"
            className="w-32 h-auto ml-4"
          />
        </div>
        <div className="flex items-center justify-center bg-white rounded-2xl w-full lg:1/3 h-auto p-2 shadow-lg overflow-hidden">
          <button
            onClick={toggleModal}
            className="text-white bg-red-500 px-4 py-2 rounded-full"
          >
            Add New Rack
          </button>
        </div>
      </div>  
      <div className="w-full lg:pl-8 h-full">
        <div className="rounded-2xl mx-auto pl-10 pt-10 pb-5 pr-10 bg-white">
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