import { Bar } from "react-chartjs-2";
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
import Testing from "../../components/monitor/Testing";
import "../../styleCss/MonitorTesting.css"; // Import CSS yang sudah diperbaiki

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
  const data = {
    labels: ["C", "D", "A", "F", "E", "G", "B", "J", "I", "H"], // Replace with your battery labels
    datasets: [
      {
        label: "1 hour",
        data: [50, 40, 60, 30, 40, 50, 70, 20, 30, 40], // Adjust your data accordingly
        backgroundColor: "rgba(0, 123, 255, 0.8)", // Blue color
      },
      {
        label: "1.5 hours",
        data: [40, 30, 50, 20, 30, 40, 60, 15, 25, 35], // Adjust your data accordingly
        backgroundColor: "rgba(255, 99, 132, 0.8)", // Red color
      },
      {
        label: "2 hours",
        data: [30, 25, 45, 15, 20, 35, 55, 10, 20, 30], // Adjust your data accordingly
        backgroundColor: "rgba(75, 192, 192, 0.8)", // Green color
      },
      {
        label: "2.5 hours",
        data: [20, 15, 35, 10, 15, 25, 40, 8, 15, 20], // Adjust your data accordingly
        backgroundColor: "rgba(153, 102, 255, 0.8)", // Purple color
      },
      {
        label: "3 hours",
        data: [10, 10, 25, 5, 10, 20, 30, 5, 10, 15], // Adjust your data accordingly
        backgroundColor: "rgba(255, 206, 86, 0.8)", // Yellow color
      },
    ],
  };

  const kwhGraph = {
    labels: ["A", "B", "C"], // Replace with your actual battery labels
    datasets: [
      {
        label: "1 H",
        data: [50, 70, 30], // Sample data for 1 hour usage, adjust accordingly
        backgroundColor: "#0052cc",
      },
      {
        label: "1.5 H",
        data: [30, 50, 20], // Sample data for 1.5 hours usage, adjust accordingly
        backgroundColor: "#0080ff",
      },
      {
        label: "2 H",
        data: [20, 40, 10], // Sample data for 2 hours usage, adjust accordingly
        backgroundColor: "#8a2be2",
      },
      {
        label: "2.5 H",
        data: [10, 30, 5], // Sample data for 2.5 hours usage, adjust accordingly
        backgroundColor: "#ff4500",
      },
      {
        label: "3 H",
        data: [5, 20, 15], // Sample data for 3 hours usage, adjust accordingly
        backgroundColor: "#ff1493",
      },
    ],
  };

  const kwhGraphOptions = {
    indexAxis: "y", // Display bars horizontally
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Energi Terpakai (kWh)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Battery",
        },
      },
    },
  };

  const options = {
    indexAxis: "y", // Display bars horizontally
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Battery Usage by Time (hours)",
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Energy Used (kWh)",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Battery",
        },
      },
    },
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="relative flex flex-col lg:flex-row justify-end h-auto lg:h-80">
          <div className="absolute z-5 w-1/4 h-full mt-24 relative flex justify-center items-center">
            <img
              className="absolute gambar-shadow-custom hide-on-small"
              src="../src/assets/picture3D/BatteryTesting1.png"
              alt="3D Human"
              style={{
                width: "auto",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </div>
          {/* Box kanan */}
          <div className="bg-red-E01414 w-full lg:w-3/4 h-auto lg:h-full mt-32 lg:mt-24 rounded-2xl relative">
            <div className="absolute top-2 left-3 w-5 h-5 bg-white rounded-full"></div>
            <div className="absolute top-2 right-3 w-5 h-5 bg-white rounded-full"></div>
            <h1 className="text-center mt-4 font-poppins text-white text-lg lg:text-xl font-black">
              Battery Testing Stacked Bar Chart
            </h1>
            <div className="flex h-auto lg:h-full">
              <div className="bg-white w-full h-64 mt-2 mx-3 mr-3 rounded-2xl">
                <Bar data={data} options={options} />
              </div>
            </div>
          </div>
        </div>

        {/* Section Bawah */}
        <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-4 mt-12 lg:mt-32">
          {/* Graph kiri */}
          <div className="bg-red-E01414 w-full lg:w-3/4 h-auto lg:h-full rounded-2xl relative p-4 ml-4">
            <div className="absolute top-2 left-3 w-5 h-5 bg-white rounded-full"></div>
            <div className="absolute top-2 right-3 w-5 h-5 bg-white rounded-full"></div>
            <h1 className="text-center font-poppins text-white text-lg lg:text-xl font-black">
              Battery Testing: kWh Graph
            </h1>
            <div className="flex h-auto lg:h-full">
              <div className="bg-white w-full h-48 mt-2 rounded-2xl">
                <Bar data={kwhGraph} options={kwhGraphOptions} />
              </div>
            </div>
          </div>

          {/* Performance Health */}
          <div className="bg-red-E01414 w-full lg:w-2/6 h-auto lg:h-full rounded-2xl relative p-4">
            <div className="absolute top-2 left-3 w-5 h-5 bg-white rounded-full"></div>
            <div className="absolute top-2 right-3 w-5 h-5 bg-white rounded-full"></div>
            <h1 className="text-center font-poppins text-white text-lg lg:text-xl font-black">
              Performance Health
            </h1>
            <div className="bg-white w-full h-48 mt-2 rounded-2xl flex justify-around items-center p-4">
              <div className="w-1/6 h-full flex items-start mt-0">
                <Testing batteryLevel="12" />
              </div>
              <div className="w-1/3 flex justify-center">
                <img
                  src="../src/assets/picture3D/HealthMonitoring.png"
                  alt="3D Human"
                  style={{
                    maxWidth: "80%",
                    maxHeight: "80%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="w-1/3 text-left font-poppins text-xs sm:text-sm">
                <p>Max performance</p>
                <p>Stable performance</p>
                <p>Good performance</p>
                <p>Declining performance</p>
                <p>Low battery</p>
              </div>
            </div>
          </div>

          {/* Gambar kanan */}
          <div className="absolute z-5 w-1/6 h-full mt-8 relative">
            <img
              className="gambar-shadow-custom hide-on-small"
              src="../src/assets/picture3D/BatteryTestinng2.png"
              alt="3D Human"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "400px",
                maxHeight: "400px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MonitorTesting;
