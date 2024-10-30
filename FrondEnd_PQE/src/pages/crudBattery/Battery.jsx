import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import CreateBattery from './CreateBattery';
import TextField from '../../components/materialCRUD/TextField';
import Header from '../../components/materialCRUD/Header';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
   // Toggle modal open/close
   const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
    <div className="mt-4 mb-4 ml-36 flex">
        <div className="bg-white mr-8 rounded-2xl w-80 h-32"></div>
        <div className="bg-white mr-8 rounded-2xl w-80 h-32"></div>
        <div className="flex items-center justify-center bg-white rounded-2xl w-80 h-32">
          <button onClick={toggleModal} className="text-white bg-red-500 px-4 py-2 rounded-full">
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
            <CreateBattery onClick={togglePopup} />
          </div>
        </div>
      )}

       {/* Modal Pop-up */}
       {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-96 h-auto bg-opacity-0 p-6  relative">
            {/* Form untuk Add New Battery */}
              <div className="flex flex-col items-center justify-center bg-red-600 rounded-lg w-full h-full">
                <Header />
                <div className="flex flex-col items-center justify-center bg-white rounded-2xl w-80 h-72 mt-5 mb-6">
                    <form action="" className="w-full ml-11 mb-2">
                        <label className="block text-black ml-2 mb-1 mt-3" htmlFor="id-battery">Id Battery</label>
                        <TextField id="id-battery" className="w-full mb-4" />

                        <label className="block text-black ml-2 mb-1" htmlFor="battery-capacity">Battery Capacity</label>
                        <TextField id="battery-capacity" className="w-full mb-4" />

                        <label className="block text-black ml-2 mb-1" htmlFor="battery-status">Battery Status</label>
                        <TextField id="battery-status" className="w-full mb-4" /><br />
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
    </>
  );
};

export default Battery;