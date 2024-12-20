import { useEffect, useState } from "react";
import TextField from "../../components/materialCRUD/TextField";
import Header from "../../components/materialCRUD/Header";
import { motion } from "framer-motion";

const CheckOutBattery = () => {
  // State untuk menyimpan data racks yang diambil
  const [checkOut, setCheckOut] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idBattery, setIdBattery] = useState("");
  const [idUsers, setIdUsers] = useState(2);
  const [date, setDate] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const [batteryStatus, setBatteryStatus] = useState(0);

  const getCheckOut = async () => {
    const response = await fetch("http://localhost:8000/api/storage-checkOut");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    setCheckOut(data);
    return data;
  };

  const handleRowClick = (index) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', { hour12: false }); // Format: HH:mm:ss
    const formattedDate = now.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD

    setIdBattery(index);
    setTimeOut(formattedTime);
    setDate(formattedDate);

    setIsModalOpen(true);
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    getCheckOut();
  }, []); // Hanya sekali saat komponen pertama kali dimuat

  // Pagination states
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const totalPages = Math.ceil(checkOut.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/storage-updateCheckOut", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "idUsers": idUsers,
          "timeOut": timeOut,
          "batteryStatus": batteryStatus,
          "date": date,
          "idBattery": idBattery,
        }),
      });

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setIdUsers("");
        setIdBattery("");
        setTimeOut("");
        setBatteryStatus("");
        setDate("");
        getCheckOut();
        toggleModal();
      } else {
        alert("Terjadi kesalahan saat menyimpan data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Tidak dapat terhubung ke server.");
    }
  };

  const currentData = checkOut.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <>
      <div className="max-w-5xl mx-auto pl-4 pt-4 pr-4 pb-4 mt-8 bg-white rounded-2xl"> 
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <h1 className="text-red-E01414 text-lg sm:text-xl mb-3 md:mb-0 font-poppins font-extrabold text-center md:text-left">Battery List</h1>
                
            <div className="flex flex-row space-x-2 md:space-y-0 items-center">
              <input
                type="text"
                placeholder="Searching...."
                 className="bg-white border-red-E01414 border text-center w-full md:w-96 h-7 rounded-lg px-2"
                />
                <div className="h-7 bg-red-E01414 flex items-center justify-center rounded-lg">
                  <select className="bg-red-E01414 text-white text-sm font-semibold rounded-lg W-20 h-full"> 
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
                <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">No</th>
                <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">Seri Battery</th>
                <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">Battery Status</th>
                <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentData.map((checkOut,index) => (
                <tr key={index}>
                  <td className="py-2 px-2 border-b">{index+1}</td>
                  <td className="py-2 px-2 border-b">{checkOut.idBattery}</td>
                  <td className="py-2 px-2 border-b">{checkOut.batteryStatus}</td>
                  <td className="border-b py-1">
                      <button onClick={() => {
                          toggleModal();
                          handleRowClick(index+1);
                      }} className="px-2 py-2 bg-red-E01414 rounded-lg text-white w-28">Check Out</button>
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
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mx-1 ${
                currentPage === index + 1
                  ? "bg-red-E01414 text-white"
                  : "bg-gray-200"
              } rounded-md`}
            >
              {index + 1}
            </button>
          ))}

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

      {/* Modal Pop-up CheckIn */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-2xl w-full max-w-[50rem] h-auto p-6 relative">
            {/* Form for checkIn battery */}
            <div className="flex flex-col items-center justify-center bg-gray-F5F5F5 rounded-md w-full h-full">
              <Header />
              <div className="mx-auto px-2 bg-white rounded-md w-full max-w-[42rem] h-auto mt-5 mb-6 border border-gray-700">
                <form onSubmit={handleSubmit} className="w-full mb-2">
                  
                    <div className="flex flex-col">
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

                    <div className="flex flex-col">
                      <label className="block text-black mb-1" htmlFor="id-battery">
                        Battery ID
                      </label>
                      <TextField
                        id="id-battery"
                        value={idBattery}
                        onChange={(e) => setIdBattery(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>

                    <div className="flex flex-col">
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
                  

                  {/* Buttons */}
                  <div className="flex justify-center mt-10 space-x-2 mb-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-0 w-full h-8 rounded-md hover:bg-blue-500 [box-shadow:0_6px_0_#1d4ed8] active:translate-y-[3px] active:[box-shadow:0_3px_0_#1d4ed8]"
                    >
                      Save
                    </button>
                    <button
                      onClick={toggleModal}
                      className="bg-red-600 text-white px-0 w-full h-8 rounded-md hover:bg-red-500 [box-shadow:0_6px_0_#b91c1c] active:translate-y-[3px] active:[box-shadow:0_3px_0_#b91c1c]"
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

export default CheckOutBattery;