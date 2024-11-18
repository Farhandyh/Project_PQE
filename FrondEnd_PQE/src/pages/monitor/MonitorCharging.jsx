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
import "../../styleCss/MonitorCharging.css";

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
      <div className="flex flex-col custom-lg:flex-col lg:flex-row justify-center mt-16 lg:mt-24 relative">
        {/* Box Outdoor Station */}
        <div className="bg-red-E01414 w-full lg:w-[80%] h-auto lg:h-72 min-h-[300px] px-5 py-5 mt-7 custom-lg:w-full-3 lg:mt-0 lg:px-10 lg:py-5 mx-5 lg:ml-7 rounded-2xl shadow-custom-dark relative mb-10 lg:mb-0">
          {/* Lingkaran di kiri atas */}
          <div
            className="absolute top-2 left-3 bg-white rounded-full"
            style={{ width: "15px", height: "15px" }}
          ></div>
          {/* Lingkaran di kanan atas */}
          <div
            className="absolute top-2 right-3 bg-white rounded-full"
            style={{ width: "15px", height: "15px" }}
          ></div>
          <h1 className=" text-center lg:-mt-2 lg:mb-4 font-poppins text-white text-xl font-bold">
            Outdoor Station
          </h1>
          <div className="flex flex-wrap justify-center gap-4 lg:grid lg:grid-cols-4 lg:gap-4 ">
            <Battery batteryLevel="60" charging="" />
            <Battery batteryLevel="40" charging="charging" />
            <Battery batteryLevel="19" charging="charging" />
            <Battery batteryLevel="87" charging="" />
          </div>
        </div>

        {/* Gambar 3D */}
        <div className="absolute mt-10 left-[calc(50%-(-40px))] lg:left-[calc(50%-(-40px))] transform -translate-x-1/2 z-20  hidden lg:block">
          <img
            className="gambar-shadow-custom1 hidden lg:block custom-portrait:hidden custom-landscape:hidden"
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
        <div className="bg-red-E01414 w-full lg:w-[70%] h-auto lg:h-72 min-h-[300px] px-5 py-5 lg:px-10 lg:py-5 mx-5 lg:ml-20 custom-lg:w-full-3 custom-lg:ml-7 custom-lg:mt-5 lg:mr-10 rounded-2xl shadow-custom-dark relative">
          {/* Lingkaran di kiri atas */}
          <div
            className="absolute top-2 left-3 bg-white rounded-full"
            style={{ width: "15px", height: "15px" }}
          ></div>
          {/* Lingkaran di kanan atas */}
          <div
            className="absolute top-2 right-3 bg-white rounded-full"
            style={{ width: "15px", height: "15px" }}
          ></div>
          <h1 className="text-center font-poppins lg:-mt-2 lg:mb-4 text-white text-xl font-bold">
            Indoor Station
          </h1>
          <div className="flex flex-wrap justify-center gap-4 lg:grid lg:grid-cols-3 lg:gap-4">
            <Battery batteryLevel="33" charging="" />
            <Battery batteryLevel="7" charging="charging" />
            <Battery batteryLevel="54" charging="" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between ml-5 lg:ml-0 custom-landscape:ml-0 items-start gap-4">
        {/* Chart Container */}
        <div className="bg-red-E01414 w-full max-w-4xl h-auto custom-lg:h-[100%] mt-5 lg:ml-7 custom-lg:max-w-2xl p-4 rounded-2xl shadow-custom-dark relative">
          {/* Lingkaran di kiri atas */}
          <div className="absolute top-2 left-3 w-4 h-4 bg-white rounded-full"></div>
          {/* Lingkaran di kanan atas */}
          <div className="absolute top-2 right-3 w-4 h-4 bg-white rounded-full"></div>

          {/* Judul */}
          <h1 className="text-center mt-2 lg:-mt-2 font-poppins text-white text-base md:text-lg lg:text-xl font-black">
            Battery Charging Line Chart
          </h1>

          {/* Chart */}
          <div className="bg-white w-full h-[300px] custom-landscape:h-[90%]  lg:h-68 mt-3 mx-auto px-4 py-2 rounded-2xl flex items-center justify-center">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* Log Container */}
        <div className="bg-red-E01414 w-full lg:w-2/6 custom-lg:mr-5 h-auto custom-lg:h-[340px] lg:h-[350px] mt-5 lg:mr-11 rounded-2xl shadow-custom-dark relative">
          {/* Lingkaran di kiri atas */}
          <div className="absolute top-2 left-3 w-4 h-4 bg-white rounded-full"></div>
          {/* Lingkaran di kanan atas */}
          <div className="absolute top-2 right-3 w-4 h-4 bg-white rounded-full"></div>

          {/* Judul */}
          <h1 className="text-center mt-2 font-poppins text-white text-base md:text-lg lg:text-xl font-bold">
            Log in/Out Charging
          </h1>

          <div className="bg-white w-[90%] custom-landscape:w-[85%] h-auto mx-auto mt-2 rounded-3xl shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-center bg-white rounded-2xl overflow-hidden">
                <thead>
                  <tr>
                    <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-white py-2">
                      No
                    </th>
                    <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-white py-2">
                      Time In
                    </th>
                    <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-white py-2">
                      Time Out
                    </th>
                    <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-white py-2">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-b border-gray-200 bg-gray-100"
                    >
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        {entry.id}
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        {entry.timeIn}
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        {entry.timeOut}
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        {entry.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MonitorCharging;
