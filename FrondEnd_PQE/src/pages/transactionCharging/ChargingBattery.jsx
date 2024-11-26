import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import TextField from '../../components/materialCRUD/TextField';
import Header from '../../components/materialCRUD/Header';

const getDataCharging = async () => {
  const response = await fetch('http://localhost:8000/api/charging');
  if (!response.ok) {
    throw new Error('Failed to fetch units charging');
  }
  const data = await response.json();
  return data;
};

const ChargingBattery = () => {
  const [chargingBattery, setChargingBattery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [idCharging,setIdCharging] = useState("");
  const [idUsers,setIdUsers] = useState("");
  const [idBattery,setIdBattery] = useState("");
  const [idUnitCharge,setIdUnitCharge] = useState("");;
  const [noMotor,setNoMotor] = useState("");
  const [dateCharging,setDateCharging] = useState("");
  const [startTime,setStartTime] = useState("");
  const [finishTime,setFinishTime] = useState("");
  const [kWhUsed,setkWhUsed] = useState("");

  const fetchDataCharging = async () => {
    try {
      const data = await getDataCharging();
      setChargingBattery(data);
    } catch (error) {
      setError("Error fetching charging data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataCharging();
  }, []);
  
  // Event untuk menampilkan data row yang dipilih dalam form update
  const handleRowClick = (chargingBattery) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', { hour12: false }); // Format: HH:mm:ss
    const formattedDate = now.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD

    setIdCharging(chargingBattery.idCharging);
    setIdUsers(chargingBattery.idUsers);
    setIdBattery(chargingBattery.idBattery);
    setDateCharging(formattedDate);
    setFinishTime(formattedTime);
    setIsUpdateOpen(true);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const itemsPerPage = 10;
  const totalPages = Math.ceil(chargingBattery.length / itemsPerPage);

  const currentData = chargingBattery.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const toggleModal = () =>{
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', { hour12: false }); // Format: HH:mm:ss
    const formattedDate = now.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD
    
    setDateCharging(formattedDate);
    setStartTime(formattedTime);
    setIsModalOpen(!isModalOpen);
   };

   const toggleUpdate = () => setIsUpdateOpen(!isUpdateOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/charging-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "idCharging" : idCharging,
          "idUsers" : idUsers,
          "idBattery" : idBattery,
          "idUnitCharge" : idUnitCharge,
          "noMotor" : noMotor,
          "dateCharging" : dateCharging,
          "startTime" : startTime,
        }),
      });

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setIdCharging("");
        setIdUsers("");
        setIdBattery("");
        setIdUnitCharge("");
        setNoMotor("");
        setDateCharging("");
        setStartTime("");
        fetchDataCharging();
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
      const response = await fetch("http://localhost:8000/api/charging-update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "idCharging" : idCharging,
          "idUsers" : idUsers,
          "idBattery" : idBattery,
          "kWhUsed" : kWhUsed,
          "finishTime" : finishTime,
        }),
      });

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setIdCharging("");
        setIdUsers("");
        setIdBattery("");
        setkWhUsed("");
        setFinishTime("");
        fetchDataCharging();
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
      <div className="mt-4 mb-4 ml-32 max-w-5xl flex">
        <div className="bg-white mr-4 rounded-2xl w-4/6 h-48 flex items-center p-2 shadow-lg">
        </div>

        <div className="bg-white mr-4 rounded-2xl w-3/6 h-48 flex items-center p-2 shadow-lg">
        </div>
        <div className="bg-white rounded-2xl w-2/6 h-48 flex items-center p-2 shadow-lg">
        </div>
      </div>
      <div className="container max-w-5xl rounded-2xl mx-auto pl-10 pb-5 pr-10 bg-white">
        <div className="flex justify-between items-center">
            <button
                onClick={toggleModal}
                className="text-white bg-red-500 px-4 py-2 rounded-full"
            >
            Testing Battery
           </button>   
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Searching...."
                className="bg-white border-red-E01414 border text-center mt-5 w-96 h-7 rounded-lg"
              />
              <div className="w-28 h-7 bg-red-E01414 justify-center rounded-lg mt-5">
                <select className="bg-red-E01414 text-white text-xl font-semibold rounded-lg w-full h-full">
                  <option value="" disabled selected className="text-center">Filter</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
          </div>
        </div>
        <table className="w-full bg-white border border-gray-200 mt-5">
          <thead>
            <tr className="bg-red-E01414 text-white">
              <th className="py-2 px-2 border-b border-r border-gray-300">
                NO
              </th>
              <th className="py-2 px-2 border-b border-r border-gray-300">
                Date
              </th>
              <th className="py-2 px-2 border-b border-r border-gray-300">
                No Motor
              </th>
              <th className="py-2 px-2 border-b border-r border-gray-300">
                Start Time
              </th>
              <th className="py-2 px-2 border-b border-r border-gray-300">
                Finish Time
              </th>
              <th className="py-2 px-2 border-b border-r border-gray-300">
                Duration
              </th>
              <th className="py-2 px-2 border-b border-r border-gray-300">
                kWh Used
              </th>
              <th className="py-2 px-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((ChargingBattery, index) => (
              <tr
                key={ChargingBattery.idCharging}
                className={`text-center ${index % 2 === 1 ? "" : ""}`}
                style={{ backgroundColor: index % 2 === 1 ? "#EDD7D7" : "" }}
              >
                <td className="py-2 px-2 border-b">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="py-2 px-2 border-b">
                  {ChargingBattery.dateCharging}
                </td>
                <td className="py-2 px-2 border-b">
                  {ChargingBattery.noMotor}
                </td>
                <td className="py-2 px-2 border-b">
                  {ChargingBattery.startTime}
                </td>
                <td className="py-2 px-2 border-b">
                  {ChargingBattery.finishTime}
                </td>
                <td className="py-2 px-2 border-b">
                  {ChargingBattery.chargingDuration}
                </td>
                <td className="py-2 px-2 border-b">
                  {ChargingBattery.kWhUsed}
                </td>
                <td
                  className="py-2 px-2 border-b"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <a
                    href="#"
                    onClick={() => {
                      toggleUpdate();
                      handleRowClick(ChargingBattery);
                    }}
                    className="mr-2 mt-2 text-green-700 hover:text-red-E01414"
                  >
                    <FaEdit />
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

      {/* Modal Pop-up Create Charging Data */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[50rem] bg-opacity-0 h-[35rem] p-6 relative">
            {/* Form for Add New Charging Data */}
            <div className="flex flex-col items-center justify-center bg-red-600 rounded-lg w-full h-full">
              <Header />
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl w-[42rem] h-5/6 mt-5 mb-6">
              <form onSubmit={handleSubmit} className="w-full px-6 mb-2">
                  <div className="flex space-x-6">
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="id-charging">
                        Charging ID
                      </label>
                      <TextField
                        id="id-charging"
                        value={idCharging}
                        onChange={(e) => setIdCharging(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="id-users">
                        Users ID
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
                        Battery ID
                      </label>
                      <TextField
                        id="id-battery"
                        value={idBattery}
                        onChange={(e) => setIdBattery(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="id-charger">
                        Charger ID
                      </label>
                      <TextField
                        id="id-charger"
                        value={idUnitCharge}
                        onChange={(e) => setIdUnitCharge(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="date-charging">
                        Date Charging
                      </label>
                      <TextField
                        id="date-charging"
                        value={dateCharging}
                        onChange={(e) => setDateCharging(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="no-motor">
                        No Motor
                      </label>
                      <TextField
                        id="no-motor"
                        value={noMotor}
                        onChange={(e) => setNoMotor(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label className="block text-black mb-1" htmlFor="start-time">
                        Start Time
                      </label>
                      <TextField
                        id="start-time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
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
            {/* Form for update charging */}
            <div className="flex flex-col items-center justify-center bg-red-600 rounded-lg w-full h-full">
              <Header />
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl w-[42rem] h-5/6 mt-5 mb-6">
              <form onSubmit={handleUpdate} className="w-full ml-11 mr-4 mb-2">
                  <label
                    className="block text-black ml-2 mb-1 mt-1"
                    htmlFor="id-battery"
                  >
                    Battery ID
                  </label>
                  <TextField
                    id="id-battery"
                    value={idBattery}
                    onChange={(e) => setIdBattery(e.target.value)}
                    className="w-full mb-4"
                  />

                  <TextField
                    id="id-users"
                    value={idUsers}
                    className="w-full mb-4"
                    hidden
                  />

                  <TextField
                    id="id-charging"
                    value={idCharging}
                    className="w-full mb-4"
                    hidden
                  />

                  <label
                    className="block text-black ml-2 mb-1"
                    htmlFor="kWh-used"
                  >
                    kWh Used
                  </label>
                  <TextField
                    id="kWh-used"
                    value={kWhUsed}
                    onChange={(e) => setkWhUsed(e.target.value)}
                    className="w-full mb-4"
                  />

                  <label
                    className="block text-black ml-2 mb-1"
                    htmlFor="finish-time"
                  >
                    Finish Time
                  </label>
                  <TextField
                    id="finish-time"
                    value={finishTime}
                    onChange={(e) => setFinishTime(e.target.value)}
                    className="w-full mb-4"
                  />
                  <br />
                  <div className="rounded-b-3xl w-52 h-11 flex items-center px-2 py-3 ml-4 mt-4">
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

export default ChargingBattery;