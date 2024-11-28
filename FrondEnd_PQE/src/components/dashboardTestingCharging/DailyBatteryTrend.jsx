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
        backgroundColor: "rgba(255, 255, 255, 0.7)", // Tailwind green-500
        borderColor: "rgba(255, 255, 255, 0.7)", // Tailwind green-800
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
          color: "#FFFFFF",
        },
      },
      tooltip: {
        backgroundColor: "rgba(43, 63, 229, 0.8)", // Tailwind gray-800
        titleColor: "#E5E7EB", // Tailwind gray-200
        bodyColor: "#E5E7EB", // Tailwind gray-200
        borderColor: "#4B5563", // Tailwind gray-600
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: "#FFFFFF" },
        grid: { color: "#C48080" },
      },
      y: {
        ticks: { color: "#FFFFFF" },
        grid: { color: "#C48080" },
      },
    },
  };
  return (
    <motion.div
      className="bg-red-E01414 bg-opacity-100 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h2 className="text-lg font-medium mb-4 text-white">
        Weekly Battery Trend
      </h2>

      <div className="h-60 w-full">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </motion.div>
  );
};

export default DailyBatteryTrend;
