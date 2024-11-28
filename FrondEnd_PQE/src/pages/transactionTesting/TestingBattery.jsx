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
import ImageButton from "../../components/materialTransaksi/ImageButton";
import SearchComponent from "../../components/materialTransaksi/SearchFilter";
import FilterComponent from "../../components/materialTransaksi/FilterComponent";

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

  //Filter Table
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  //Filter Table

  //Fungsi Filter Table
  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Search Query:", query);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    console.log("Selected Filter:", filter);
  };
  //Fungsi Filter Table

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

  const filters = [
    {
      category: "category1",
      label: "Category 1",
      options: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ],
    },
    {
      category: "category2",
      label: "Category 2",
      options: [
        { value: "option3", label: "Option 3" },
        { value: "option4", label: "Option 4" },
      ],
    },
    {
      category: "category3",
      label: "Category 3",
      options: [
        { value: "option5", label: "Option 5" },
        { value: "option6", label: "Option 6" },
        { value: "option7", label: "Option 7" },
      ],
    },
  ];

  return (
    <>
      <div className="p-5 px-4 mx-auto lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <DailyBatteryTrend sourceData={DailyBatteryTrendData} />
          <TestingGraphLine sourceData={TestingGrapLine} />
        </motion.div>

        <div className="grid grid-cols-1 max-w-full mx-auto pl-4 pr-4 pt-4 pb-4 bg-white rounded-2xl border border-gray-700">
          <div className="grid grid-cols-1 gap-5">
            {/* Card Add New Users */}
            <ImageButton
              imgSrc="../src/assets/menuCRUD/CRUDUser/user3D.png"
              imgAlt="User Icon"
              buttonLabel="Add New Battery"
              onClick={toggleModal}
              divClass="-mt-10"
              buttonClass="" // Tambahan styling jika dibutuhkan
            />

            <div className="grid grid-cols-1 sm:flex space-x-2">
              <SearchComponent
                placeholder="Searching...."
                onSearch={handleSearch}
                buttonLabel="Search"
              />
              <FilterComponent />
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg  max-w-[19.8rem] sm:max-w-[40rem] md:max-w-full shadow">
            <table className="w-full bg-white mt-5 text-sm md:text-base">
              <thead className="text-center">
                <tr className="bg-red-E01414 text-white">
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    NO
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Users ID
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Battery ID
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Machine ID
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Testing Date
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    kWh Used
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Time Start
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Time Finish
                  </th>
                  <th className="py-2 px-2 border-b border-r border-gray-300 tracking-wide whitespace-nowrap">
                    Duration
                  </th>
                  <th className="py-2 px-2 border-b tracking-wide whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentTesting.map((testing, index) => (
                  <tr
                    key={testing.idTesting}
                    className={`text-center ${
                      index % 2 === 1 ? "bg-gray-100" : ""
                    }`}
                  >
                    <td className="py-2 px-2 border-b">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {testing.idUsers}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {testing.idBattery}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {testing.idMachine}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {testing.dateTesting}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {testing.kWhUsed}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {testing.timeStart}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {testing.timeFinish}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      {testing.testingDuration}
                    </td>
                    <td className="py-2 px-2 border-b whitespace-nowrap">
                      <div className="flex justify-center">
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
                      </div>
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
              className="px-3 py-1 mx-1 bg-gray-200 rounded-md [box-shadow:0_8px_0_#D2D2D4] active:translate-y-[4px] active:[box-shadow:0_4px_0_#D5D6D9]"
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
              className="px-3 py-1 mx-1 bg-gray-200 rounded-md [box-shadow:0_8px_0_#D2D2D4] active:translate-y-[4px] active:[box-shadow:0_4px_0_#D5D6D9]"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Modal Pop-up Testing Battery */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-2xl w-full max-w-[50rem] h-auto p-6 relative">
            {/* Form for Add Testing Battery */}
            <div className="flex flex-col items-center justify-center bg-gray-F5F5F5 rounded-md w-full h-full">
              <Header />
              <div className="mx-auto px-2 bg-white rounded-md w-full max-w-[42rem] h-auto mt-5 mb-6 border border-gray-700">
                <form onSubmit={handleSubmit} className="w-full px-6 mb-2">
                  {/* STATS */}
                  <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 px-6 font-poppins font-extralight mt-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
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
                    <div className="flex flex-col ">
                      <label
                        className="block font-medium text-black mb-1"
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

                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
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
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
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

                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
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
                    <div className="flex flex-col">
                      <label
                        className="block font-medium text-black mb-1"
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
                  </motion.div>

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

      {/* modal untuk update */}
      {isUpdateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className=" rounded-2xl w-full max-w-[50rem] h-auto p-6 relative">
            {/* Form untuk upadate Machine */}
            <div className="flex flex-col items-center justify-center bg-gray-F5F5F5 rounded-md w-full h-full">
              <Header />
              <div className="mx-auto px-2 bg-white rounded-md w-full max-w-[42rem] h-auto mt-5 mb-6 border border-gray-700">
                <form onSubmit={handleUpdate} className="w-full px-6 mb-2">
                  {/* STATS */}
                  <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 px-6 font-poppins font-extralight mt-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <div className="flex flex-col">
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
                    </div>

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
                    <div className="flex flex-col">
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
                    </div>
                    <div className="flex flex-col">
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
                    </div>
                  </motion.div>

                  {/* Buttons */}
                  <div className="flex justify-center mt-10 space-x-2 mb-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-0 w-full h-8 rounded-md hover:bg-blue-500 [box-shadow:0_6px_0_#1d4ed8] active:translate-y-[3px] active:[box-shadow:0_3px_0_#1d4ed8]"
                    >
                      Save
                    </button>
                    <button
                      onClick={toggleUpdate}
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
export default TestingBattery;
