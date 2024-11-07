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

const MonitorTesting = () => {
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
      <div className="flex flex-col">
        <div className="relative flex justify-end">
          <img
            className="absolute z-10 mt-24 gambar-shadow-custom"
            src="../src/assets/picture3D/BatteryTesting1.png" // Pastikan jalur gambar benar
            alt="3D Human" // Tambahkan deskripsi alternatif untuk aksesibilitas
            style={{
              maxHeight: "350px", // Tinggi maksimum gambar
              maxWidth: "350px", // Lebar maksimum gambar
              width: "350px", // Atur lebar otomatis untuk menjaga rasio
              height: "350px", // Atur tinggi otomatis untuk menjaga rasio
              objectFit: "cover", // Menjaga rasio aspek gambar
              left: "50px"
              }}
          />
          <div className="bg-red-E01414 w-3/4 h-80 mt-24 mr-3 rounded-2xl relative">
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
            <h1 className="text-center mt-4 font-poppins text-white text-xl font-black">
            Battery Testing Stacked Bar Chart
            </h1>
            <div className="flex h-full">
              <div className="bg-white w-full h-64 mt-2 ml-3 mr-3 rounded-2xl">
              </div>
            </div>
          </div>
        </div>  

        <div className="relative flex gap-4 justify-start">
          <img
            className="absolute z-10 mt-16 gambar-shadow-custom"
            src="../src/assets/picture3D/BatteryTestinng2.png" // Pastikan jalur gambar benar
            alt="3D Human" // Tambahkan deskripsi alternatif untuk aksesibilitas
            style={{
              maxHeight: "250px", // Tinggi maksimum gambar
              maxWidth: "250px", // Lebar maksimum gambar
              width: "320px", // Atur lebar otomatis untuk menjaga rasio
              height: "250px", // Atur tinggi otomatis untuk menjaga rasio
              objectFit: "cover", // Menjaga rasio aspek gambar
              left: "1250px"
              }}
          />
          <div className="bg-red-E01414 w-3/6 h-64 mt-4 mr-8 ml-3 rounded-2xl relative">
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
            <h1 className="text-center mt-4 font-poppins text-white text-xl font-black">
            Battery Testing: kWh Graph
            </h1>
            <div className="flex h-full">
              <div className="bg-white w-full h-48 mt-2 ml-3 mr-3 rounded-2xl">
              </div>
            </div>
          </div>

          <div className="bg-red-E01414 w-2/6 h-64 mt-4 mr-3 rounded-2xl relative">
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
            <h1 className="text-center mt-4 font-poppins text-white text-xl font-black">
            Peformance Health
            </h1>
            <div className="flex h-full">
              <div className="bg-white w-full h-48 mt-2 ml-3 mr-3 rounded-2xl">
              </div>
            </div>
          </div>
        </div>  
      </div>
    </>
  );
};

export default MonitorTesting;
