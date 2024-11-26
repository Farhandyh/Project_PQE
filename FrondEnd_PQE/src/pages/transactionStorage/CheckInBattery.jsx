import { useEffect, useState } from "react";
import TextField from "../../components/materialCRUD/TextField";
import Header from "../../components/materialCRUD/Header";

const CheckInBattery = () => {
  // State untuk menyimpan data racks yang diambil
  const [rackDetails, setRackDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idBattery, setIdBattery] = useState("");
  const [idUsers, setIdUsers] = useState(2);
  const [idRack, setIdRack] = useState("");
  const [date, setDate] = useState("");
  const [timeIn, setTimeIn] = useState("");
  const [batteryStatus, setBatteryStatus] = useState(1);

  // Function untuk mengambil data racks dari API satu per satu
  const fetchRackDetails = async () => {
    let rackId = 1;  // Mulai dengan idRack pertama
    let allRacks = []; // Tempat menampung semua racks yang sudah dimuat

    try {
      while (true) {
        // Kirim permintaan ke API untuk mengambil data dengan idRack tertentu
        const responseRacks = await fetch(`http://localhost:8000/api/storage-checkIn?idRack=${rackId}`);
        const rack = await responseRacks.json();

        // Jika tidak ada data, berarti sudah selesai
        if (rack.length === 0) {
          break;
        }

        // Tambahkan rack yang ditemukan ke dalam allRacks
        allRacks = [...allRacks, ...rack];

        // Increment idRack untuk mencoba idRack berikutnya
        rackId += 1;
      }

      if (allRacks.length === 0) {
        setError("No racks available");
        return;
      }

      setRackDetails(allRacks); // Set racks data ke state
    } catch (err) {
      setError(err.message || "Error fetching rack details");
    } finally {
      setLoading(false); // Set loading ke false setelah data selesai di-fetch
    }
  };

  const handleRowClick = (index) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', { hour12: false }); // Format: HH:mm:ss
    const formattedDate = now.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD

    setIdRack(index);
    setTimeIn(formattedTime);
    setDate(formattedDate);

    setIsModalOpen(true);
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Menjalankan fetchRackDetails saat komponen pertama kali dimuat
  useEffect(() => {
    fetchRackDetails();
  }, []); // Hanya sekali saat komponen pertama kali dimuat

  // Toggle modal open/close

  // Pagination states
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const totalPages = Math.ceil(rackDetails.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/storage-createCheckIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "idUsers": idUsers,
          "idBattery": idBattery,
          "idRack": idRack,
          "timeIn": timeIn,
          "batteryStatus": batteryStatus,
          "date": date,
        }),
      });

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setIdUsers("");
        setIdBattery("");
        setIdRack("");
        setTimeIn("");
        setBatteryStatus("");
        setDate("");
        fetchRackDetails();
        toggleModal();
      } else {
        alert("Terjadi kesalahan saat menyimpan data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Tidak dapat terhubung ke server.");
    }
  };

  const currentData = rackDetails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <>
      <div className="container max-w-5xl rounded-2xl mx-auto pl-10 pt-10 pb-5 pr-10 mt-8 bg-white">
            <div className="flex justify-between items-center">
                <h1 className="text-red-E01414 text-xl mb-5 font-poppins font-extrabold">Rack List</h1>
                
                <div className="flex space-x-2">
                <input
                    type="text"
                    placeholder="Searching...."
                    className="bg-white border-red-E01414 border text-center w-96 h-7 rounded-lg"
                />
                <div className="w-28 h-7 bg-red-E01414 justify-center rounded-lg">
                    <select className="bg-red-E01414 text-white text-xl font-semibold rounded-lg w-full h-full">
                        <option value="" disabled selected className="text-center">Filter</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </div>
            </div>
        </div>

        <table className="w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-red-E01414 text-white">
              <th className="py-2 px-2 border-b border-r border-gray-300">No</th>
              <th className="py-2 px-2 border-b border-r border-gray-300">Rack Name</th>
              <th className="py-2 px-2 border-b border-r border-gray-300">Material</th>
              <th className="py-2 px-2 border-b border-r border-gray-300">Weight</th>
              <th className="py-2 px-2 border-b border-r border-gray-300">Capacity</th>
              <th className="py-2 px-2 border-b border-r border-gray-300">Available</th>
              <th className="py-2 px-2 border-b border-r border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentData.map((rack,index) => (
              <tr key={index}>
                <td className="py-2 px-2 border-b">{index+1}</td>
                <td className="py-2 px-2 border-b">{rack.rackName}</td>
                <td className="py-2 px-2 border-b">{rack.rackMaterial}</td>
                <td className="py-2 px-2 border-b">{rack.weight}</td>
                <td className="py-2 px-2 border-b">{rack.capacity}</td>
                <td className="py-2 px-2 border-b">{rack.available}</td>
                <td className="border-b py-1">
                  {rack.available > 0 ? (
                    <button onClick={() => {
                        toggleModal();
                        handleRowClick(index+1);
                      }} className="px-2 py-2 bg-red-E01414 rounded-lg text-white w-28">Check In</button>
                  ) : (
                    <button disabled></button>
                  )}
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
          <div className="bg-white rounded-2xl w-[40rem] bg-opacity-0 h-[25rem] p-6 relative">
            {/* Form for checkIn battery */}
            <div className="flex flex-col items-center justify-center bg-red-600 rounded-lg w-full h-full">
              <Header />
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl w-[32rem] h-5/6 mt-5 mb-6">
                <form onSubmit={handleSubmit} className="w-full px-6 mb-2">
                  <div className="flex space-x-6">
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="id-rack">
                        Rack ID
                      </label>
                      <TextField
                        id="id-rack"
                        value={idRack}
                        onChange={(e) => setIdRack(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
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
                  </div>

                  <div className="flex space-x-4">
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
    </>
  );
};

export default CheckInBattery;