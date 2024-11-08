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
    const data = {
      labels: ['C', 'D', 'A', 'F', 'E', 'G', 'B', 'J', 'I', 'H'], // Replace with your battery labels
      datasets: [
        {
          label: '1 hour',
          data: [50, 40, 60, 30, 40, 50, 70, 20, 30, 40], // Adjust your data accordingly
          backgroundColor: 'rgba(0, 123, 255, 0.8)', // Blue color
        },
        {
          label: '1.5 hours',
          data: [40, 30, 50, 20, 30, 40, 60, 15, 25, 35], // Adjust your data accordingly
          backgroundColor: 'rgba(255, 99, 132, 0.8)', // Red color
        },
        {
          label: '2 hours',
          data: [30, 25, 45, 15, 20, 35, 55, 10, 20, 30], // Adjust your data accordingly
          backgroundColor: 'rgba(75, 192, 192, 0.8)', // Green color
        },
        {
          label: '2.5 hours',
          data: [20, 15, 35, 10, 15, 25, 40, 8, 15, 20], // Adjust your data accordingly
          backgroundColor: 'rgba(153, 102, 255, 0.8)', // Purple color
        },
        {
          label: '3 hours',
          data: [10, 10, 25, 5, 10, 20, 30, 5, 10, 15], // Adjust your data accordingly
          backgroundColor: 'rgba(255, 206, 86, 0.8)', // Yellow color
        },
      ],
    };

    const kwhGraph = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          label: 'Energi Terpakai (kWh)',
          data: [20, 40, 100],
          backgroundColor: ['purple', 'orange', 'blue'],
        },
      ],
    };

    const kwhGraphOptions = {
      indexAxis: 'y', // Display bars horizontally
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Energi Terpakai (kWh)',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Waktu Pemakaian (jam)',
          },
        },
      },
    };

    const options = {
      indexAxis: 'y', // Display bars horizontally
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Battery Usage by Time (hours)',
        },
      },
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: 'Energy Used (kWh)',
          },
        },
        y: {
          stacked: true,
          title: {
            display: true,
            text: 'Battery',
          },
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
                <Bar data={data} options={options}/>
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
                <Bar data={kwhGraph} options={kwhGraphOptions} />;
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
