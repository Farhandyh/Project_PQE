import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrasi komponen Chart.js
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ revenueData }) => {
  const chartData = {
    labels: revenueData.map((data) => data.label),
    datasets: [
      {
        label: "Revenue",
        data: revenueData.map((data) => data.revenue),
        backgroundColor: "rgba(6, 79, 240, 0.2)",
        borderColor: "#064FF0",
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "#064FF0",
      },
      {
        label: "Cost",
        data: revenueData.map((data) => data.cost),
        backgroundColor: "rgba(255, 48, 48, 0.2)",
        borderColor: "#FF3030",
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "#FF3030",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Agar grafik tidak memaksakan rasio tetap
    plugins: {
      title: {
        display: true,
        text: "Monthly Revenue & Cost",
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
      transition={{ delay: 0.0 }}
    >
      <h2 className="text-lg font-medium mb-4 text-red-E01414">
        Revenue vs Cost
      </h2>
      <div className="h-80">
        <Line data={chartData} options={chartOptions} />
      </div>
    </motion.div>
  );
};

export default LineChart;
