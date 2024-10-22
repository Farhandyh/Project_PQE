import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const getBatteries = async () => {
  const response = await fetch('http://localhost:81/PROJECT_PQE/api/battery/getBattery.php');
  if (!response.ok) {
    throw new Error('Failed to fetch batteries');
  }
  const data = await response.json();
  return data; 
};

const Battery = () => {
  const [batteries, setBatteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBatteries = async () => {
      try {
        const data = await getBatteries(); 
        console.log(data); // Tambahkan untuk debugging
        if (data.message) {
          throw new Error(data.message);
        }
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

  // Batas jumlah data per halaman
  const itemsPerPage = 10;

  // Menghitung total halaman
  const totalPages = Math.ceil(batteries.length / itemsPerPage);

  // Mendapatkan data untuk halaman saat ini
  const currentBatteries = batteries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Fungsi untuk navigasi halaman
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto mt-5 px-10">
      <h2 className="text-2xl font-bold mb-4">Battery List</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-red-E01414 text-white">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Capacity (kWh)</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentBatteries.map((battery) => (
            <tr key={battery.idBattery} className="hover:bg-gray-100 text-center">
              <td className="py-2 px-4 border-b">{battery.idBattery}</td>
              <td className="py-2 px-4 border-b">{battery.batteryCapacity}</td>
              <td className="py-2 px-4 border-b">
                {battery.batteryStatus === "1" ? "Active" : "Non-Active"}
              </td>
              <td className="py-2 px-4 border-b" style={{ display: "flex", justifyContent: "center" }}>
                <a href="#" className="mr-2 text-blue-500 hover:text-red-E01414">
                  <FaEdit />
                </a>
                <a href="#" className="mr-2 text-blue-500 hover:text-red-E01414">
                  <FaTrashAlt />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginasi */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 ${
              currentPage === index + 1 ? "bg-red-E01414 text-white" : "bg-gray-200"
            } rounded-md`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Battery;