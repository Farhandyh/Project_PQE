import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import Battery from "../../components/monitor/Battery";

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonitorCharging = () => {
  const [attendanceData, setAttendanceData] = useState([
    { id: 1, timeIn: "10:00", timeOut: "6:00", status: "Present" },
    { id: 2, timeIn: "11:00", timeOut: "7:00", status: "Late" },
    { id: 3, timeIn: "9:30", timeOut: "5:30", status: "Present" },
    { id: 4, timeIn: "8:45", timeOut: "4:45", status: "Present" },
    { id: 5, timeIn: "10:15", timeOut: "6:15", status: "Late" },
    { id: 6, timeIn: "9:00", timeOut: "5:00", status: "Present" },
    { id: 7, timeIn: "10:30", timeOut: "6:30", status: "Late" },
    { id: 8, timeIn: "8:00", timeOut: "4:00", status: "Present" },
    { id: 9, timeIn: "9:15", timeOut: "5:15", status: "Present" },
    { id: 10, timeIn: "10:45", timeOut: "6:45", status: "Late" },
  ]);

  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Battery Usage (kWh)",
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Battery Usage Over Time",
      },
    },
  };

  // Data for the Stacked Bar Chart
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Charging",
        data: [5, 10, 3, 4, 2, 5],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Discharging",
        data: [3, 5, 2, 3, 1, 2],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Idle",
        data: [4, 7, 1, 2, 3, 4],
        backgroundColor: "rgba(255, 206, 86, 0.6)",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Battery Status Over Time",
      },
    },
    scales: {
      y: {
        stacked: true, // Set stacked to true
      },
      x: {
        stacked: true, // Set stacked to true
      },
    },
  };

  return (
    <>
      <div className="flex mt-24 relative">
        {/* Box Outdoor Station */}
        <div className="bg-red-E01414 w-[80%] h-72 ml-7 rounded-2xl shadow-custom-dark relative">
          {/* Lingkaran di kiri atas */}
          <div
            className="absolute top-2 left-3 w-5 h-5 bg-white rounded-full"
            style={{
              width: "15px",
              height: "15px",
            }}
          ></div>

          {/* Lingkaran di kanan atas */}
          <div
            className="absolute top-2 right-3 w-5 h-5 bg-white rounded-full"
            style={{
              width: "15px",
              height: "15px",
            }}
          ></div>
          <h1 className="text-center mt-2 font-poppins text-white text-xl font-bold">
            Outdoor Station
          </h1>
          <div className="flex h-full">
            <div className="bg-white w-40 h-3/4 mr-1 mt-2 ml-5 rounded-2xl p-1 flex flex-col items-center">
              <Battery batteryLevel="60" charging="" />
            </div>
            <div className="bg-white w-40 h-3/4 mr-1 mt-2 ml-5 rounded-2xl p-1 flex flex-col items-center">
              <Battery batteryLevel="40" charging="charging" />
            </div>
            <div className="bg-white w-40 h-3/4 mr-1 mt-2 ml-5 rounded-2xl p-1 flex flex-col items-center">
              <Battery batteryLevel="19" charging="charging" />
            </div>
            <div className="bg-white w-40 h-3/4 mr-5 mt-2 ml-5 rounded-2xl p-1 flex flex-col items-center">
              <Battery batteryLevel="87" charging="" />
            </div>
          </div>
        </div>

        {/* Gambar 3D */}
        <div className="absolute mt-10 left-[56%] transform -translate-x-1/2 z-20">
          <img
            className="gambar-shadow-custom1"
            src="../src/assets/picture3D/LeafChargingMonitor.png" // Pastikan jalur gambar benar
            alt="3D Human" // Tambahkan deskripsi alternatif untuk aksesibilitas
            style={{
              maxHeight: "200px", // Tinggi maksimum gambar
              maxWidth: "205px", // Lebar maksimum gambar
              width: "auto", // Atur lebar otomatis untuk menjaga rasio
              height: "auto", // Atur tinggi otomatis untuk menjaga rasio
              objectFit: "cover", // Menjaga rasio aspek gambar
            }}
          />
        </div>

        {/* Box Indoor Station */}
        <div className="bg-red-E01414 w-[80%] h-72 rounded-2xl ml-36 mr-12 shadow-custom-dark relative">
          {/* Lingkaran di kiri atas */}
          <div
            className="absolute top-2 left-3 w-5 h-5 bg-white rounded-full"
            style={{
              width: "15px",
              height: "15px",
            }}
          ></div>

          {/* Lingkaran di kanan atas */}
          <div
            className="absolute top-2 right-3 w-5 h-5 bg-white rounded-full"
            style={{
              width: "15px",
              height: "15px",
            }}
          ></div>
          <h1 className="text-center mt-2 font-poppins text-white text-xl font-bold">
            Indoor Station
          </h1>
          <div className="flex h-full">
            <div className="bg-white w-40 h-3/4 mr-3 mt-2 ml-5 rounded-2xl p-1 flex flex-col items-center">
              <Battery batteryLevel="33" charging="" />
            </div>
            <div className="bg-white w-40 h-3/4 mr-3 mt-2 ml-3 rounded-2xl p-1 flex flex-col items-center">
              <Battery batteryLevel="7" charging="charging" />
            </div>
            <div className="bg-white w-40 h-3/4 mr-5 mt-2 ml-3 rounded-2xl p-1 flex flex-col items-center">
              <Battery batteryLevel="54" charging="" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="bg-red-E01414 w-[65%] h-80 mt-5 ml-7 rounded-2xl mr-7 shadow-custom-dark relative">
          {/* Lingkaran di kiri atas */}
          <div
            className="absolute top-2 left-3 w-5 h-5 bg-white rounded-full"
            style={{
              width: "15px",
              height: "15px",
            }}
          ></div>

          {/* Lingkaran di kanan atas */}
          <div
            className="absolute top-2 right-3 w-5 h-5 bg-white rounded-full"
            style={{
              width: "15px",
              height: "15px",
            }}
          ></div>

          <h1 className="text-center mt-2 font-poppins text-white text-xl font-black">
            Battery Charging Line Chart
          </h1>
          <div className="bg-white w-6/6 h-3/4 mr-5 mt-3 ml-5 rounded-2xl flex items-center justify-center">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        <div className="bg-red-E01414 w-2/6 h-[320px] mt-5 mr-11 rounded-2xl relative shadow-custom-dark">
          {/* Lingkaran di kiri atas */}
          <div
            className="absolute top-2 left-3 w-5 h-5 bg-white rounded-full"
            style={{
              width: "15px",
              height: "15px",
            }}
          ></div>

          {/* Lingkaran di kanan atas */}
          <div
            className="absolute top-2 right-3 w-5 h-5 bg-white rounded-full"
            style={{
              width: "15px",
              height: "15px",
            }}
          ></div>

          <h1 className="text-center mt-2 font-poppins text-white text-xl font-bold">
            Log in/Out Charging
          </h1>
          <div className="bg-white w-6/6 h-[265px] mr-5 mt-2 ml-5 rounded-2xl relative">
            <table className="absolute top-2 left-0 right-0 w-[95%] text-center bg-white rounded-2xl overflow-hidden mx-auto h-2">
              <thead>
                <tr>
                  <th className="px-6 bg-red-700  text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-gray-200">
                    No
                  </th>
                  <th className="px-6 bg-red-700  text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-gray-200">
                    Time In
                  </th>
                  <th className="px-6 bg-red-700  text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-gray-200">
                    Time Out
                  </th>
                  <th className="px-6 bg-red-700  text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-gray-200">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-gray-200 bg-gray-EDD7D7"
                  >
                    <td className="px-6 text-sm font-poppins font-light text-black">
                      {entry.id}
                    </td>
                    <td className="px-6 text-sm font-poppins font-light text-black">
                      {entry.timeIn}
                    </td>
                    <td className="px-6 text-sm font-poppins font-light text-black">
                      {entry.timeOut}
                    </td>
                    <td className="px-6 text-sm font-poppins font-light text-black">
                      {entry.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MonitorCharging;
