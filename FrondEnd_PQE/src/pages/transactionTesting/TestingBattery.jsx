import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import TextField from "../../components/materialCRUD/TextField";
import Header from "../../components/materialCRUD/Header";
import DailyBatteryTrend from "../../components/dashboardTestingCharging/DailyBatteryTrend";
import TestingGraphLine from "../../components/dashboardTestingCharging/TestingGraphLine";

//Data Dummy
import DailyBatteryTrendData from "../../dataDummy/dailyBatteryTrendData.json";
import TestingGrapLine from "../../dataDummy/testingGrapLineData.json";

const getDataTesting = async () => {
  const response = await fetch("http://localhost:8000/api/testing");
  if (!response.ok) {
    throw new Error("Failed to fetch data testing");
  }
  const data = await response.json();
  return data;
};

const TestingBattery = () => {
  const [testing, setTesting] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [idTesting, setIdTesting] = useState("");
  const [idUsers, setIdUsers] = useState("");
  const [idBattery, setIdBattery] = useState("");
  const [idMachine, setIdMachine] = useState("");
  const [dateTesting, setDateTesting] = useState("");
  const [kWhUsed, setkWhUsed] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeFinish, setTimeFinish] = useState("");

  const fetchTesting = async () => {
    try {
      const data = await getDataTesting();
      setTesting(data);
    } catch (error) {
      setError("Error fetching testing data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTesting();
  }, []);

  // Event untuk menampilkan data row yang dipilih dalam form update
  const handleRowClick = (testingData) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString("en-US", { hour12: false }); // Format: HH:mm:ss
    const formattedDate = now.toLocaleDateString("en-CA"); // Format: YYYY-MM-DD

    setIdTesting(testingData.idTesting);
    setIdUsers(testingData.idUsers);
    setIdBattery(testingData.idBattery);
    setDateTesting(formattedDate);
    setTimeFinish(formattedTime);
    setIsUpdateOpen(true);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const itemsPerPage = 10;
  const totalPages = Math.ceil(testing.length / itemsPerPage);

  const currentTesting = testing.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Toggle modal open/close
  const toggleModal = () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString("en-US", { hour12: false }); // Format: HH:mm:ss
    const formattedDate = now.toLocaleDateString("en-CA"); // Format: YYYY-MM-DD

    setDateTesting(formattedDate);
    setTimeStart(formattedTime);
    setIsModalOpen(!isModalOpen);
  };
  const toggleUpdate = () => setIsUpdateOpen(!isUpdateOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/testing-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idTesting: idTesting,
          idUsers: idUsers,
          idBattery: idBattery,
          idMachine: idMachine,
          dateTesting: dateTesting,
          timeStart: timeStart,
        }),
      });

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setIdTesting("");
        setIdUsers("");
        setIdBattery("");
        setIdMachine("");
        setDateTesting("");
        setTimeStart("");
        fetchTesting();
        toggleModal();
      } else {
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
      const response = await fetch("http://localhost:8000/api/testing-update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idTesting: idTesting,
          idUsers: idUsers,
          idBattery: idBattery,
          kWhUsed: kWhUsed,
          timeFinish: timeFinish,
        }),
      });

      if (response.ok) {
        alert("Data berhasil disimpan!");
        setIdTesting("");
        setIdUsers("");
        setIdBattery("");
        setkWhUsed("");
        setTimeFinish("");
        fetchTesting();
        toggleUpdate();
      } else {
        alert("Terjadi kesalahan saat menyimpan data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Tidak dapat terhubung ke server.");
    }
  };

  return (
    <>
      <div className="p-5 px-4 mx-auto md:px-20 lg:px-32">
        {/* STATS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <DailyBatteryTrend sourceData={DailyBatteryTrendData} />
          <TestingGraphLine sourceData={TestingGrapLine} />

          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          ></motion.div>
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
                  <option value="" disabled selected className="text-center">
                    Filter
                  </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
            </div>
          </div>
          <table className="w-full bg-white border mt-5 border-gray-200">
            <thead>
              <tr className="bg-red-E01414 text-white">
                <th className="py-2 px-2 border-b border-r border-gray-300">
                  NO
                </th>
                <th className="py-2 px-2 border-b border-r border-gray-300">
                  Users ID
                </th>
                <th className="py-2 px-2 border-b border-r border-gray-300">
                  Battery ID
                </th>
                <th className="py-2 px-2 border-b border-r border-gray-300">
                  Machine ID
                </th>
                <th className="py-2 px-2 border-b border-r border-gray-300">
                  Testing Date
                </th>
                <th className="py-2 px-2 border-b border-r border-gray-300">
                  kWh Used
                </th>
                <th className="py-2 px-2 border-b border-r border-gray-300">
                  Time Start
                </th>
                <th className="py-2 px-2 border-b border-r border-gray-300">
                  Time Finish
                </th>
                <th className="py-2 px-2 border-b border-r border-gray-300">
                  Duration
                </th>
                <th className="py-2 px-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTesting.map((testing, index) => (
                <tr
                  key={testing.idTesting}
                  className={`text-center ${index % 2 === 1 ? "" : ""}`}
                  style={{ backgroundColor: index % 2 === 1 ? "#EDD7D7" : "" }}
                >
                  <td className="py-2 px-2 border-b">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="py-2 px-2 border-b">{testing.idUsers}</td>
                  <td className="py-2 px-2 border-b">{testing.idBattery}</td>
                  <td className="py-2 px-2 border-b">{testing.idMachine}</td>
                  <td className="py-2 px-2 border-b">{testing.dateTesting}</td>
                  <td className="py-2 px-2 border-b">{testing.kWhUsed}</td>
                  <td className="py-2 px-2 border-b">{testing.timeStart}</td>
                  <td className="py-2 px-2 border-b">{testing.timeFinish}</td>
                  <td className="py-2 px-2 border-b">
                    {testing.testingDuration}
                  </td>
                  <td
                    className="py-2 px-2 border-b"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <a
                      href="#"
                      onClick={() => {
                        toggleUpdate();
                        handleRowClick(testing);
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
      </div>

      {/* Modal Pop-up Testing Battery */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[50rem] bg-opacity-0 h-[35rem] p-6 relative">
            {/* Form for Add Testing Battery */}
            <div className="flex flex-col items-center justify-center bg-red-600 rounded-lg w-full h-full">
              <Header />
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl w-[42rem] h-5/6 mt-5 mb-6">
                <form onSubmit={handleSubmit} className="w-full px-6 mb-2">
                  <div className="flex space-x-6">
                    <div className="flex flex-col w-1/2">
                      <label
                        className="block text-black mb-1"
                        htmlFor="id-testing"
                      >
                        Testing ID
                      </label>
                      <TextField
                        id="id-testing"
                        value={idTesting}
                        onChange={(e) => setIdTesting(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label
                        className="block text-black mb-1"
                        htmlFor="id-users"
                      >
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
                      <label
                        className="block text-black mb-1"
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
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label
                        className="block text-black mb-1"
                        htmlFor="id-machine"
                      >
                        Machine ID
                      </label>
                      <TextField
                        id="id-machine"
                        value={idMachine}
                        onChange={(e) => setIdMachine(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label
                        className="block text-black mb-1"
                        htmlFor="date-testing"
                      >
                        Date Testing
                      </label>
                      <TextField
                        id="date-testing"
                        value={dateTesting}
                        onChange={(e) => setDateTesting(e.target.value)}
                        className="w-full mb-4"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label
                        className="block text-black mb-1"
                        htmlFor="time-start"
                      >
                        Time Start
                      </label>
                      <TextField
                        id="time-start"
                        value={timeStart}
                        onChange={(e) => setTimeStart(e.target.value)}
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
          <div className="bg-white rounded-2xl w-96 h-auto bg-opacity-0 p-6  relative">
            {/* Form untuk upadate Machine */}
            <div className="flex flex-col items-center justify-center bg-red-600 rounded-lg w-96 h-full">
              <Header />
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl w-80 h-80 mt-5 mb-6">
                <form
                  onSubmit={handleUpdate}
                  className="w-full ml-11 mr-4 mb-2"
                >
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
                    id="id-testing"
                    value={idTesting}
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
                    htmlFor="time-finish"
                  >
                    Time Finish
                  </label>
                  <TextField
                    id="time-finish"
                    value={timeFinish}
                    onChange={(e) => setTimeFinish(e.target.value)}
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
export default TestingBattery;
