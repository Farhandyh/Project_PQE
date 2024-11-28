import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrasi komponen Chart.js
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ sourceData }) => {
  const chartData = {
    labels: sourceData.map((data) => data.label),
    datasets: [
      {
        label: "Count",
        data: sourceData.map((data) => data.value),
        backgroundColor: [
          "rgba(43, 63, 229, 0.8)",
          "rgba(250, 192, 19, 0.8)",
          "rgba(253, 135, 135, 0.8)",
        ],
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Agar grafik tidak memaksakan rasio tetap
    plugins: {
      title: {
        display: true,
        text: "Revenue Source",
        color: "#E01414",
        font: { size: 18 },
      },
      legend: {
        position: "top",
        labels: {
          color: "#E01414",
        },
      },
      datalabels: {
        display: false, // Menonaktifkan data labels
      },
    },
    scales: {
      x: {
        ticks: { color: "#000000" },
        grid: { color: "#F6DEDE" },
      },
      y: {
        ticks: { color: "#000000" },
        grid: { color: "#F6DEDE" },
      },
    },
  };

  return (
    <motion.div
      className="bg-white bg-opacity-100 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h2 className="text-lg font-medium mb-4 text-red-E01414">
        Revenue Source
      </h2>
      <div className="h-80">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </motion.div>
  );
};

export default BarChart;
