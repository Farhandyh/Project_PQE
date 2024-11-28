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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TestingGraphLine = ({ sourceData }) => {
  const chartData = {
    labels: sourceData.map((data) => data.date), // X-axis labels
    datasets: [
      {
        label: "Daily Orders",
        data: sourceData.map((data) => data.orders), // Y-axis data
        borderColor: "#FF3030", // Tailwind purple-500
        backgroundColor: "rgba(255, 48, 48, 0.2)", // Semi-transparent fill
        tension: 0.4, // Curve smoothing
        pointBackgroundColor: "#FF3030",
        pointBorderColor: "#FF3030",
        pointRadius: 4,
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
          color: "#E01414", // Tailwind gray-200
        },
      },
      tooltip: {
        backgroundColor: "rgba(31, 41, 55, 0.8)", // Tailwind gray-800
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
        ticks: { color: "#00000" },
        grid: { color: "#F6DEDE" },
      },
      y: {
        ticks: { color: "#00000" },
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
      <h2 className="text-lg font-medium text-red-E01414 mb-4">Daily Orders</h2>

      <div className="h-60 w-full">
        <Line data={chartData} options={chartOptions} />
      </div>
    </motion.div>
  );
};

export default TestingGraphLine;
