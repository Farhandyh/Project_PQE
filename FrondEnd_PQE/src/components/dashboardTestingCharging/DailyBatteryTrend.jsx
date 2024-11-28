import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DailyBatteryTrend = ({ sourceData }) => {
  const chartData = {
    labels: sourceData.map((data) => data.name),
    datasets: [
      {
        label: "Daily Battery",
        data: sourceData.map((data) => data.sales),
        backgroundColor: "rgba(255, 48, 48, 0.2)", // Tailwind green-500
        borderColor: "#FF3030",
        borderWidth: 1,
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
          color: "#E01414",
        },
      },
      tooltip: {
        backgroundColor: "rgba(43, 63, 229, 0.8)", // Tailwind gray-800
        titleColor: "#E5E7EB", // Tailwind gray-200
        bodyColor: "#E5E7EB", // Tailwind gray-200
        borderColor: "#4B5563", // Tailwind gray-600
        borderWidth: 1,
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
        Weekly Battery Trend
      </h2>

      <div className="h-60 w-full">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </motion.div>
  );
};

export default DailyBatteryTrend;
