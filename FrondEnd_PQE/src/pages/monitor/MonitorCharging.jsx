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
import Navbar from "../../components/monitor/Navbar";

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
      <div className="flex mt-24">
        <div className=" bg-red-E01414 w-[100%] h-64 ml-7 rounded-2xl shadow-custom-dark relative">
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
          <h1 className="text-center mt-2 font-poppins text-white text-xl font-bold flex-none">
            Outdoor Station
          </h1>
          <div className="flex h-full">
            <div className="bg-white w-40 h-3/4 mr-1 mt-2 ml-5 rounded-2xl"></div>
            <div className="bg-white w-40 h-3/4 mr-1 mt-2 ml-5 rounded-2xl"></div>
            <div className="bg-white w-40 h-3/4 mr-1 mt-2 ml-5 rounded-2xl"></div>
            <div className="bg-white w-40 h-3/4 mr-5 mt-2 ml-5 rounded-2xl"></div>
          </div>
        </div>
        <img
          className=" mt-7 w-5 h-5 z-10 gambar-shadow-custom"
          src="../src/assets/picture3D/LeafChargingMonitor.png" // Pastikan jalur gambar benar
          alt="3D Human" // Tambahkan deskripsi alternatif untuk aksesibilitas
          style={{
            maxHeight: "200px", // Tinggi maksimum gambar
            maxWidth: "300px", // Lebar maksimum gambar
            width: "300px", // Atur lebar otomatis untuk menjaga rasio
            height: "350px", // Atur tinggi otomatis untuk menjaga rasio
            objectFit: "cover", // Menjaga rasio aspek gambar
          }}
        />
        <div className="bg-red-E01414 w-[80%] h-64 rounded-2xl mr-7 shadow-custom-dark relative">
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
            <div className="bg-white w-40 h-3/4 mr-3 mt-2 ml-5 rounded-2xl"></div>
            <div className="bg-white w-40 h-3/4 mr-3 mt-2 ml-3 rounded-2xl"></div>
            <div className="bg-white w-40 h-3/4 mr-5 mt-2 ml-3 rounded-2xl"></div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="bg-red-E01414 w-full h-72 mt-20 ml-7 rounded-2xl mr-7 shadow-custom-dark relative">
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

        <div className="bg-red-E01414 w-2/6 h-96 mt-2 mr-7 ml-3 rounded-2xl">
          <h1 className="text-center mt-4 font-mono text-white text-xl font-bold">
            Battery Storage Monitoring
          </h1>
          <div className="bg-white w-6/6 h-3/4 mr-5 mt-2 ml-5 rounded-2xl">
            <table className="min-w-full bg-white border border-gray-200 h-4">
              <thead>
                <tr>
                  <th className="px-6 bg-red-700 text-left text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-200">
                    No
                  </th>
                  <th className="px-6 bg-red-700 text-left text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-200">
                    Time In
                  </th>
                  <th className="px-6 bg-red-700 text-left text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-200">
                    Time Out
                  </th>
                  <th className="px-6 bg-red-700 text-left text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-200">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 bg-red-300">
                  <td className="px-6 text-sm font-medium text-white">1</td>
                  <td className="px-6 text-sm font-medium text-white">10:00</td>
                  <td className="px-6 text-sm font-medium text-white">6:00</td>
                  <td className="px-6 text-sm font-medium text-white">
                    Present
                  </td>
                </tr>
                <tr className="border-b border-gray-200 bg-red-300">
                  <td className="px-6 text-sm font-medium text-white">2</td>
                  <td className="px-6 text-sm font-medium text-white">11:00</td>
                  <td className="px-6 text-sm font-medium text-white">7:00</td>
                  <td className="px-6 text-sm font-medium text-white">Late</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MonitorCharging;
