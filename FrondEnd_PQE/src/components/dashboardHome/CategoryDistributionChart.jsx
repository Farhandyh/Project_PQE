import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import plugin

// Registrasi komponen Chart.js yang diperlukan
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const categoryData = [
  { name: "Complete", value: 4500 },
  { name: "On Going", value: 3200 },
  { name: "Error", value: 2800 },
];

const COLORS = ["#6366F1", "#CECE01", "#EC6B56"];

const CategoryDistributionChart = () => {
  const totalValue = categoryData.reduce((acc, curr) => acc + curr.value, 0);

  const chartData = {
    labels: categoryData.map((entry) => entry.name),
    datasets: [
      {
        data: categoryData.map((entry) => entry.value),
        backgroundColor: COLORS,
        borderColor: "#1F2937", // warna border chart
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Agar grafik tidak memaksakan rasio tetap
    plugins: {
      tooltip: {
        backgroundColor: "rgba(31, 41, 55, 0.8)",
        titleColor: "#E5E7EB",
        bodyColor: "#E5E7EB",
        borderColor: "#4B5563",
      },
      legend: {
        position: "top",
        labels: {
          color: "#E01414",
        },
      },
      datalabels: {
        color: "#00000", // warna teks label
        formatter: (value, ctx) => {
          const percentage = ((value / totalValue) * 100).toFixed(0); // Hitung persentase
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return `${label} ${percentage}%`; // Menampilkan nama kategori dan persentase
        },
        font: {
          weight: "bold",
          size: 16, // Ukuran font
        },
        align: "center", // Posisi label di tengah pie
        anchor: "center", // Penempatan anchor
      },
    },
  };

  return (
    <motion.div
      className="bg-white bg-opacity-100 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 flex justify-center items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.0 }}
    >
      <div className="text-center w-full">
        <h2 className="text-lg text-left font-medium mb-4 text-red-E01414">
          Status Charging
        </h2>
        <div className="h-80 w-full">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryDistributionChart;
