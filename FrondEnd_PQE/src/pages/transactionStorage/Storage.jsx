import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import TextField from '../../components/materialCRUD/TextField';
import Header from '../../components/materialCRUD/Header';

const getStorage = async () => {
  const response = await fetch('http://localhost:8000/api/storage-history');
  if (!response.ok) {
    throw new Error('Failed to fetch racks');
  }
  const data = await response.json();
  return data;
};

const Storage = () => {
  const [storage, setStorage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [idStorage,setIdStorage] = useState("");
  const [idUsers,setIdUsers] = useState("");
  const [idBattery,setIdBattery] = useState("");
  const [idRack,setIdRack] = useState("");
  const [timeIn,setTimeIn] = useState("");
  const [timeOut,setTimeOut] = useState("");
  const [batteryStatus,setBatteryStatus] = useState("");
  const [date,setDate] = useState("");

  const fetchStorage = async () => {
    try {
      const data = await getStorage();
      setStorage(data);
    } catch (error) {
      setError("Error fetching storage history.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchStorage();
  }, []);
  
  // Event untuk menampilkan data row yang dipilih dalam form update
  const handleRowClick = (storageData) => {
    setIdStorage(storageData.idStorage);
    setIdUsers(storageData.idUsers);
    setIdBattery(storageData.idBattery);
    setIdRack(storageData.idRack);
    setTimeIn(storageData.timeIn);
    setTimeOut(storageData.timeOut);
    setBatteryStatus(storageData.batteryStatus);
    setDate(storageData.date);
    setIsUpdateOpen(true);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const itemsPerPage = 10;
  const totalPages = Math.ceil(storage.length / itemsPerPage);

  const currentStorage = storage.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

   // Toggle modal open/close
   const toggleModal = () => setIsModalOpen(!isModalOpen);
   const toggleUpdate = () => setIsUpdateOpen(!isUpdateOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/storage-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "idStorage" : idStorage,
          "idUsers" : idUsers,
          "idBattery" : idBattery,
          "idRack" : idRack,
          "timeIn" : timeIn,
          "timeOut" : timeOut,
          "batteryStatus" : batteryStatus,
          "date" : date
        }),
      });

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setIdStorage("");
        setIdUsers("");
        setIdBattery("");
        setIdRack("");
        setTimeIn("");
        setTimeOut("");
        setBatteryStatus("");
        setDate("");
        fetchStorage();
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
      const response = await fetch("http://localhost:8000/api/storage-update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "idStorage" : idStorage,
          "idUsers" : idUsers,
          "idBattery" : idBattery,
          "idRack" : idRack,
          "timeIn" : timeIn,
          "timeOut" : timeOut,
          "batteryStatus" : batteryStatus,
          "date" : date
        }),
      });

      if (response.ok) {
        alert("Data berhasil disimpan!");
        ssetIdStorage("");
        setIdUsers("");
        setIdBattery("");
        setIdRack("");
        setTimeIn("");
        setTimeOut("");
        setBatteryStatus("");
        setDate("");
        fetchStorage();
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
      <div className="max-w-5xl mx-auto pl-4 pt-4 pr-4 pb-4 mt-8 bg-white rounded-2xl"> 
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <h1 className="text-red-E01414 text-lg sm:text-xl mb-3 md:mb-0 font-poppins font-extrabold text-center md:text-left">History Transaction</h1> 

            <div className="flex flex-row space-x-2 md:space-y-0 items-center">
              <input
                type="text"
                placeholder="Searching...."
                className="bg-white border-red-E01414 border text-center w-full md:w-96 h-7 rounded-lg px-2"
              />
              <div className="h-7 bg-red-E01414 flex items-center justify-center rounded-lg">
              <select className="bg-red-E01414 text-white text-sm font-semibold rounded-lg w-20 h-full">
                  <option value="" disabled selected className="text-center">Filter</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
            </div>
        </div>
        <div className="overflow-x-auto max-w-[21.6rem] sm:max-w-[60rem] lg:max-w-full rounded-lg shadow mt-6">
        <table className="w-full bg-white border border-gray-200 text-sm md:text-base">
            <thead>
              <tr className="bg-red-E01414 text-white">
                <th className="py-2 px-2 border-b border-r border-gray-300 whitespace-nowrap">
                  NO
                </th>
                <th className="py-2 px-2 border-b border-r border-gray-300 whitespace-nowrap">
                  Id User
                </th>
                <th className="py-2 px-2 border-b border-r border-gray-300 whitespace-nowrap">
                  Id Battery
                </th>
                <th className="py-2 px-2 border-b border-r border-gray-300 whitespace-nowrap">
                  Id Rack
                </th>
                <th className="py-2 px-2 border-b border-r border-gray-300 whitespace-nowrap">
                  Time In
                </th>
                <th className="py-2 px-2 border-b border-r border-gray-300 whitespace-nowrap">
                  Time Out
                </th>
                <th className="py-2 px-2 border-b border-r border-gray-300 whitespace-nowrap">
                  Battery Status
                </th>
                <th className="py-2 px-2 border-b border-r border-gray-300 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
              <tbody>
                {currentStorage
                .sort((a, b) => {
                  // Mengonversi timeIn menjadi objek Date untuk perbandingan waktu
                  const timeA = new Date(`1970-01-01T${a.timeIn}`);
                  const timeB = new Date(`1970-01-01T${b.timeIn}`);
                  return timeB - timeA; // Urutkan descending berdasarkan timeIn
                })
                .map((storage, index) => (
                  <tr
                    key={storage.idStorage}
                    className={`text-center ${index % 2 === 1 ? "" : ""}`}
                    style={{ backgroundColor: index % 2 === 1 ? "#EDD7D7" : "" }}
                  >
                    <td className="py-2 px-2 border-b">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="py-2 px-2 border-b">{storage.idUsers}</td>
                    <td className="py-2 px-2 border-b">{storage.idBattery}</td>
                    <td className="py-2 px-2 border-b">{storage.idRack}</td>
                    <td className="py-2 px-2 border-b">{storage.timeIn}</td>
                    <td className="py-2 px-2 border-b">{storage.timeOut}</td>
                    <td className="py-2 px-2 border-b">
                      {storage.batteryStatus === 1 ? "Active" : "Non-Active"}
                    </td>
                    <td className="py-2 px-2 border-b">{storage.date}</td>
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
      {/* Modal Pop-up Create Rack */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[50rem] bg-opacity-0 h-[35rem] p-6 relative">
            {/* Form for Store Battery */}
            <div className="flex flex-col items-center justify-center bg-red-600 rounded-lg w-full h-full">
              <Header />
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl w-[42rem] h-5/6 mt-5 mb-6">
                <form onSubmit={handleSubmit} className="w-full px-6 mb-2">
                  <div className="flex space-x-6">
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="id-storage">
                        Id Storage
                      </label>
                      <TextField
                        id="id-storage"
                        value={idStorage}
                        onChange={(e) => setIdStorage(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="id-users">
                        Id Users
                      </label>
                      <TextField
                        id="id-users"
                        value={idUsers}
                        onChange={(e) => setIdUsers(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="id-battery">
                        Id Battery
                      </label>
                      <TextField
                        id="id-battery"
                        value={idBattery}
                        onChange={(e) => setIdBattery(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
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
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="time-in">
                        Time In
                      </label>
                      <TextField
                        id="time-in"
                        value={timeIn}
                        onChange={(e) => setTimeIn(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="time-out">
                        Time Out
                      </label>
                      <TextField
                        id="time-out"
                        value={timeOut}
                        onChange={(e) => setTimeOut(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="battery-status">
                        Battery Status
                      </label>
                      <TextField
                        id="battery-status"
                        value={batteryStatus}
                        onChange={(e) => setBatteryStatus(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="date">
                        Date
                      </label>
                      <TextField
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
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
            {/* Form for update trasaction */}
            <div className="flex flex-col items-center justify-center bg-red-600 rounded-lg w-full h-full">
              <Header />
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl w-[42rem] h-5/6 mt-5 mb-6">
              <form onSubmit={handleUpdate} className="w-full px-6 mb-2">
                  <div className="flex space-x-6">
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="id-storage">
                        Id Storage
                      </label>
                      <TextField
                        id="id-storage"
                        value={idStorage}
                        onChange={(e) => setIdStorage(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="id-users">
                        Id Users
                      </label>
                      <TextField
                        id="id-users"
                        value={idUsers}
                        onChange={(e) => setIdUsers(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="id-battery">
                        Id Battery
                      </label>
                      <TextField
                        id="id-battery"
                        value={idBattery}
                        onChange={(e) => setIdBattery(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
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
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="time-in">
                        Time In
                      </label>
                      <TextField
                        id="time-in"
                        value={timeIn}
                        onChange={(e) => setTimeIn(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="time-out">
                        Time Out
                      </label>
                      <TextField
                        id="time-out"
                        value={timeOut}
                        onChange={(e) => setTimeOut(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="battery-status">
                        Battery Status
                      </label>
                      <TextField
                        id="battery-status"
                        value={batteryStatus}
                        onChange={(e) => setBatteryStatus(e.target.value)}
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

export default Storage;