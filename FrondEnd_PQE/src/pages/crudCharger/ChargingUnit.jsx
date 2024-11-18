import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import TextField from '../../components/materialCRUD/TextField';
import Header from '../../components/materialCRUD/Header';

const getUnits = async () => {
  const response = await fetch('http://localhost:8000/api/units');
  if (!response.ok) {
    throw new Error('Failed to fetch units charging');
  }
  const data = await response.json();
  return data;
};

const deleteUnit = async (idUnitCharge) => {
  const response = await fetch(`http://localhost:8000/api/batteries-destroy/${idUnitCharge}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete unit charging');
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
  const [idUnitCharge,setIdUnitCharge] = useState("");
  const [unitName,setUnitName] = useState("");
  const [noSeriUnit,setNoSeriUnit] = useState("");
  const [averageChargingTime,setAverageChargingTime] = useState("");
  const [connectorTypeUnit,setConnectorType] = useState("");
  const [unitLocation,setUnitLocation] = useState("");
  const [unitStatus,setUnitStatus] = useState("");

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
    setConnectorType(chargingUnit.connectorType);
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
        prevUnits.filter((ChargingUnit) => ChargingUnit.idUnitCharge !== idUnitCharge)
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
          "idUnitCharge" : idUnitCharge,
          "unitLocation" : unitLocation,
          "unitStatus" : unitStatus
        }),
      });

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setIdUnitCharge("");
        setUnitLocation("");
        setUnitStatus("");
        fetchUnits();
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
      const response = await fetch("http://localhost:8000/api/batteries-update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "idUnitCharge" : idUnitCharge,
          "unitLocation" : unitLocation,
          "unitStatus" : unitStatus
        }),
      });

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setIdUnitCharge("");
        setUnitLocation("");
        setUnitStatus("");
        fetchUnits();
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
      <div className="mt-4 mb-4 ml-36 flex">
<<<<<<< HEAD
        <div className="bg-white mr-8 rounded-2xl w-80 h-32 flex items-center p-16 shadow-lg">
=======
        <div className="bg-white mr-8 rounded-2xl w-80 h-32 flex items-center p-2 shadow-lg">
>>>>>>> main
          {/* Gambar di sebelah kiri */}
          <img
            src="../src/assets/menuCRUD/charging.png"
            alt="Charging Unit Icon"
            className="w-36 h-auto"
          />

          {/* Bagian teks */}
          <div className="flex flex-col justify-center">
            <h3 className="font-poppins text-2xl font-semibold text-red-600 text-center mb-1">
              Charging Unit
            </h3>
            <h1 className="font-poppins text-shadow-custom font-extrabold text-7xl text-red-600 text-center">
              036
            </h1>
          </div>
        </div>

        <div className="bg-white mr-8 rounded-2xl w-80 h-32 flex items-center p-2 shadow-lg">
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
        <div className="flex items-center justify-center bg-white rounded-2xl w-80 h-32">
          <button
            onClick={toggleModal}
            className="text-white bg-red-500 px-4 py-2 rounded-full"
          >
            Add New Charger
          </button>
        </div>
      </div>
      <div className="container max-w-5xl rounded-2xl mx-auto pl-10 pt-10 pb-5 pr-10 bg-white">
        <table className="w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-red-E01414 text-white">
              <th className="py-2 px-2 border-b border-r border-gray-300">
                NO
              </th>
              <th className="py-2 px-2 border-b border-r border-gray-300">
                Unit Name
              </th>
              <th className="py-2 px-2 border-b border-r border-gray-300">
                Seri Unit
              </th>
              <th className="py-2 px-2 border-b border-r border-gray-300">
                Charging Time
              </th>
              <th className="py-2 px-2 border-b border-r border-gray-300">
                Connector Type
              </th>
              <th className="py-2 px-2 border-b border-r border-gray-300">
                Capacity
              </th>
              <th className="py-2 px-2 border-b border-r border-gray-300">
                Status
              </th>
              <th className="py-2 px-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUnits.map((ChargingUnit, index) => (
              <tr
                key={ChargingUnit.idUnitCharge}
                className={`text-center ${index % 2 === 1 ? "" : ""}`}
                style={{ backgroundColor: index % 2 === 1 ? "#EDD7D7" : "" }}
              >
                <td className="py-2 px-2 border-b">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="py-2 px-2 border-b">
                  {ChargingUnit.unitName}
                </td>
                <td className="py-2 px-2 border-b">
                  {ChargingUnit.noSeriUnit}
                </td>
                <td className="py-2 px-2 border-b">
                  {ChargingUnit.averageChargingTime}
                </td>
                <td className="py-2 px-2 border-b">
                  {ChargingUnit.connectorTypeUnit}
                </td>
                <td className="py-2 px-2 border-b">
                  {ChargingUnit.unitLocation}
                </td>
                <td className="py-2 px-2 border-b">
                  {ChargingUnit.unitStatus === 1 ? "Active" : "Non-Active"}
                </td>
                <td
                  className="py-2 px-2 border-b"
                  style={{ display: "flex", justifyContent: "center" }}
                >
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
                    onClick={() => handleDelete(ChargingUnit.idUnitCharge)}
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
      {/* Modal Pop-up Create Charger */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-96 h-auto bg-opacity-0 p-6  relative">
            {/* Form untuk Add New Charger */}
            <div className="flex flex-col items-center justify-center bg-red-600 rounded-lg w-96 h-full">
              <Header />
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl w-80 h-72 mt-5 mb-6">
                <form onSubmit={handleSubmit} className="w-full ml-11 mb-2">
                  <label
                    className="block text-black ml-2 mb-1 mt-3"
                    htmlFor="id-unit"
                  >
                    Id Charging Unit
                  </label>
                  <TextField
                    id="id-unit"
                    value={idUnitCharge}
                    onChange={(e) => setIdUnitCharge(e.target.value)}
                    className="w-full mb-4"
                  />

                  <label
                    className="block text-black ml-2 mb-1"
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

                  <label
                    className="block text-black ml-2 mb-1"
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
            {/* Form untuk Add New Battery */}
            <div className="flex flex-col items-center justify-center bg-red-600 rounded-lg w-96 h-full">
              <Header />
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl w-80 h-72 mt-5 mb-6">
                <form onSubmit={handleUpdate} className="w-full ml-11 mb-2">
                  <label
                    className="block text-black ml-2 mb-1 mt-3"
                    htmlFor="id-unit"
                  >
                    Id Charging Unit
                  </label>
                  <TextField
                    id="id-unit"
                    value={idUnitCharge}
                    onChange={(e) => setIdUnitCharge(e.target.value)}
                    className="w-full mb-4"
                  />

                  <label
                    className="block text-black ml-2 mb-1"
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

                  <label
                    className="block text-black ml-2 mb-1"
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
                  <br />
                  <div className="rounded-b-3xl w-52 h-11 flex items-center px-2 py-3 mt-2">
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

export default ChargingUnit;