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
      <div className="flex justify-flex">
          <img
              className="w-1/6 h-48 z-10 mt-24 gambar-shadow-custom"
              src="../src/assets/picture3D/BatteryStorage3.png" // Pastikan jalur gambar benar
              alt="3D Human" // Tambahkan deskripsi alternatif untuk aksesibilitas
              style={{
                maxHeight: "400px", // Tinggi maksimum gambar
                maxWidth: "500px", // Lebar maksimum gambar
                width: "300px", // Atur lebar otomatis untuk menjaga rasio
                height: "380px", // Atur tinggi otomatis untuk menjaga rasio
                objectFit: "cover", // Menjaga rasio aspek gambar
              }}
            />
        <div className="bg-red-E01414 w-4/6 h-80 mt-24 ml-7 rounded-2xl relative">
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
              Total Battery
            </h1>
            <div className="flex h-full">
              <div className="bg-white w-full h-32 mt-2 ml-3 mr-3 rounded-2xl">
              <img
              className="left-5  w-5 h-5 z-10 gambar-shadow-custom"
              src="../src/assets/picture3D/BatteryStorage3.png" // Pastikan jalur gambar benar
              alt="3D Human" // Tambahkan deskripsi alternatif untuk aksesibilitas
              style={{
                maxHeight: "120px", // Tinggi maksimum gambar
                maxWidth: "100px", // Lebar maksimum gambar
                width: "300px", // Atur lebar otomatis untuk menjaga rasio
                height: "150px", // Atur tinggi otomatis untuk menjaga rasio
                objectFit: "cover", // Menjaga rasio aspek gambar
              }}
            />
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default MonitorTesting;
