import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import CreateBattery from './CreateBattery';

const getBatteries = async () => {
  const response = await fetch('http://localhost:8000/api/batteries');
  if (!response.ok) {
    throw new Error('Failed to fetch batteries');
  }
  const data = await response.json();
  return data;
};

const deleteBattery = async (idBattery) => {
  const response = await fetch(`http://localhost:8000/api/batteries-destroy/${idBattery}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete battery');
  }
  return await response.json();
};

const Battery = () => {
  const [batteries, setBatteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Status buka-tutup popup

  useEffect(() => {
    const fetchBatteries = async () => {
      try {
        const data = await getBatteries();
        setBatteries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBatteries();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

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

  const togglePopup = () => setIsPopupOpen(!isPopupOpen); // Fungsi buka-tutup popup

  return (
    <>
    <div className="mt-4 mb-4 ml-36 flex">
        <div className="bg-white mr-8 rounded-2xl w-80 h-32"></div>
        <div className="bg-white mr-8 rounded-2xl w-80 h-32"></div>
        <div className="flex items-center justify-center bg-white rounded-2xl w-80 h-32">
          <button onClick={togglePopup} className="text-white bg-red-500 px-4 py-2 rounded-full">
            Add New Battery
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
          {currentBatteries.map((battery, index) => (
            <tr
              key={battery.idBattery}
              className={`text-center ${index % 2 === 1 ? "bg-pink-100" : ""}`}
            >
              <td className="py-2 px-2 border-b">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="py-2 px-2 border-b">{battery.batteryCapacity}</td>
              <td className="py-2 px-2 border-b">
                {battery.batteryStatus === 1 ? "Active" : "Non-Active"}
              </td>
              <td
                className="py-2 px-2 border-b"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <a href="#" className="mr-2 mt-2 text-green-700 hover:text-red-E01414">
                  <FaEdit />
                </a>
                <a
                  href="#"
                  onClick={() => handleDelete(battery.idBattery)}
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
    {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-opacity-0 rounded-lg w-96 h-96">
            <CreateBattery />
          </div>
        </div>
      )}
    </>
  );
};

export default Battery;