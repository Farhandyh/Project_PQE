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
        <div className="bg-white mr-8 rounded-2xl w-80 h-32"></div>
        <div className="bg-white mr-8 rounded-2xl w-80 h-32"></div>
        <div className="flex items-center justify-center bg-white rounded-2xl w-80 h-32">
          <button onClick={toggleModal} className="text-white bg-red-500 px-4 py-2 rounded-full">
            Add New Charger
          </button>
        </div>
    </div>
    <div className="container max-w-5xl rounded-2xl mx-auto pl-10 pt-10 pb-5 pr-10 bg-white">
      <table className="w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-red-E01414 text-white">
            <th className="py-2 px-2 border-b border-r border-gray-300">NO</th>
            <th className="py-2 px-2 border-b border-r border-gray-300">Capacity</th>
            <th className="py-2 px-2 border-b border-r border-gray-300">Status</th>
            <th className="py-2 px-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUnits.map((ChargingUnit, index) => (
            <tr
              key={ChargingUnit.idUnitCharge}
              className={`text-center ${index % 2 === 1 ? "bg-pink-100" : ""}`}
            >
              <td className="py-2 px-2 border-b">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="py-2 px-2 border-b">{ChargingUnit.unitLocation}</td>
              <td className="py-2 px-2 border-b">
                {ChargingUnit.unitStatus === 1 ? "Active" : "Non-Active"}
              </td>
              <td
                className="py-2 px-2 border-b"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <a href="#" 
                onClick={() => { 
                    toggleUpdate(); 
                    handleRowClick(battery); 
                }}
                className="mr-2 mt-2 text-green-700 hover:text-red-E01414">
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
                  currentPage === pageNumber ? "bg-red-E01414 text-white" : "bg-gray-200"
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
                        <label className="block text-black ml-2 mb-1 mt-3" htmlFor="id-unit">Id Charging Unit</label>
                        <TextField id="id-unit" value={idUnitCharge} onChange={(e) => setIdUnitCharge(e.target.value)} className="w-full mb-4" />

                        <label className="block text-black ml-2 mb-1" htmlFor="unit-location">Unit Location</label>
                        <TextField id="unit-location" value={unitLocation} onChange={(e) => setUnitLocation(e.target.value)}  className="w-full mb-4" />

                        <label className="block text-black ml-2 mb-1" htmlFor="unit-status">Unit Status</label>
                        <TextField id="unit-status" value={unitStatus} onChange={(e) => setUnitStatus(e.target.value)}  className="w-full mb-4" /><br />
                        <div className="rounded-b-3xl w-52 h-11 flex items-center px-2 py-3 mt-2">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded-md mr-2 hover:bg-blue-600">
                                Save
                            </button>
                            <button onClick={toggleModal} className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 ml-24">
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
                        <label className="block text-black ml-2 mb-1 mt-3" htmlFor="id-unit">Id Charging Unit</label>
                        <TextField id="id-unit" value={idUnitCharge} onChange={(e) => setIdUnitCharge(e.target.value)} className="w-full mb-4" />

                        <label className="block text-black ml-2 mb-1" htmlFor="unit-location">Unit Location</label>
                        <TextField id="unit-location" value={unitLocation} onChange={(e) => setUnitLocation(e.target.value)}  className="w-full mb-4" />

                        <label className="block text-black ml-2 mb-1" htmlFor="unit-status">Unit Status</label>
                        <TextField id="unit-status" value={unitStatus} onChange={(e) => setUnitStatus(e.target.value)}  className="w-full mb-4" /><br />
                        <div className="rounded-b-3xl w-52 h-11 flex items-center px-2 py-3 mt-2">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded-md mr-2 hover:bg-blue-600">
                                Save
                            </button>
                            <button onClick={toggleUpdate} className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 ml-24">
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