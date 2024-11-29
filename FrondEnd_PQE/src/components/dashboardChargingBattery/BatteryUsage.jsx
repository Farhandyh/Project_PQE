import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BatteryUsage = ({ sourceData, width, height }) => {
  const chartData = {
    labels: sourceData.map((data) => data.name),
    datasets: [
      {
        label: "Battery Usage",
        data: sourceData.map((data) => data.usage),
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Warna latar belakang
        borderColor: "rgba(54, 162, 235, 1)", // Warna garis
        borderWidth: 2,
        pointBackgroundColor: "rgba(54, 162, 235, 1)", // Warna titik data
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#4B5563", // Warna teks legend
        },
      },
      tooltip: {
        backgroundColor: "rgba(31, 41, 55, 0.8)", // Warna latar tooltip
        titleColor: "#E5E7EB", // Warna judul tooltip
        bodyColor: "#E5E7EB", // Warna teks tooltip
        borderColor: "#4B5563", // Warna border tooltip
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: "#000000" }, // Warna tick axis X
        grid: { color: "#E5E7EB" }, // Warna grid axis X
      },
      y: {
        ticks: { color: "#000000" }, // Warna tick axis Y
        grid: { color: "#E5E7EB" }, // Warna grid axis Y
      },
    },
  };

  return (
    <motion.div
      className="bg-white bg-opacity-100 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      style={{ width, height: "100%" }} // Mengatur tinggi menjadi 50%
    >
      <h2 className="text-lg font-medium mb-4 text-gray-700">
        Battery Usage Trend
      </h2>

      <div style={{ height: "80%", width: "100%" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </motion.div>
  );
};

export default BatteryUsage;
