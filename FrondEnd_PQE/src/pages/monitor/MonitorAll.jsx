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

import "../../index.css";
import Image3D from "../../components/dashboard/image/Image3D";

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

const Monitor = () => {
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
      <div className="flex">
        <div className="bg-red-E01414 w-2/6 h-72 mt-24 ml-7 rounded-2xl shadow-custom-dark relative">
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

          <img
            className="absolute top-2  w-5 h-5"
            src="../src/assets/picture3D/human3D.png" // Pastikan jalur gambar benar
            alt="3D Human" // Tambahkan deskripsi alternatif untuk aksesibilitas
            style={{
              maxHeight: "150px", // Tinggi maksimum gambar
              maxWidth: "200px", // Lebar maksimum gambar
              width: "160px", // Atur lebar otomatis untuk menjaga rasio
              height: "auto", // Atur tinggi otomatis untuk menjaga rasio
              objectFit: "cover", // Menjaga rasio aspek gambar
              left: "-15px", // Geser lebih ke kiri
            }}
          />

          <h1 className="text-center mt-2 font-poppins text-white text-16px font-black">
            Battery Storage Monitoring
          </h1>
          <div className="bg-white w-6/6 h-56 mr-5 mt-2 ml-5 rounded-3xl shadow-lg">
            <div className="flex flex-col items-end mr-8">
              {/* Tambahkan margin untuk jarak antara gambar dan teks */}
              <h2 className="font-poppins font-extrabold text-16px text-red-800 text-right mr-5">
                Actual Battery
              </h2>
              <h1 className="font-poppins text-shadow-custom font-extrabold -mt-6 text-88px text-red-800 text-right">
                036
              </h1>
            </div>

            <div>
              <h2 className="font-poppins font-bold text-16px -mt-6 text-red-800 text-left ml-2">
                Battery In/Out Log:
              </h2>
              <table className=" text-center bg-white h-2 rounded-2xl overflow-hidden mx-auto">
                <thead>
                  <tr>
                    <th className="bg-red-700 text-center text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-white">
                      No
                    </th>
                    <th className="bg-red-700 text-center text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-white">
                      Time In
                    </th>
                    <th className="bg-red-700 text-center text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-white">
                      Time Out
                    </th>
                    <th className="bg-red-700 text-center text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-white">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 bg-gray-EDD7D7">
                    <td className="px-6 text-sm font-poppins font-light text-black">
                      1
                    </td>
                    <td className="px-6 text-sm font-poppins font-light text-black">
                      10:00
                    </td>
                    <td className="px-6 text-sm font-poppins font-light text-black">
                      6:00
                    </td>
                    <td className="px-6 text-sm font-poppins font-light text-black">
                      Present
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-EDD7D7">
                    <td className="px-6 text-sm font-poppins font-light text-black">
                      2
                    </td>
                    <td className="px-6 text-sm font-poppins font-light text-black">
                      11:00
                    </td>
                    <td className="px-6 text-sm font-poppins font-light text-black">
                      7:00
                    </td>
                    <td className="px-6 text-sm font-poppins font-light text-black">
                      Late
                    </td>
                  </tr>
                  <tr className=" border-gray-200 bg-gray-EDD7D7">
                    <td className="px-6 text-sm font-poppins font-light text-black">
                      2
                    </td>
                    <td className="px-6 text-sm font-poppins font-light text-black">
                      11:00
                    </td>
                    <td className="px-6 text-sm font-poppins font-light text-black">
                      7:00
                    </td>
                    <td className="px-6 text-sm font-poppins font-light text-black">
                      Late
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-red-E01414 w-full h-72 mt-24 ml-7 rounded-2xl mr-7 shadow-custom-dark relative">
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

          <h1 className="text-center mt-2 font-poppins text-white text-xl font-black">
            Battery Charging Line Chart
          </h1>
          <div className="bg-white w-6/6 h-3/4 mr-5 mt-3 ml-5 rounded-2xl flex items-center justify-center">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="bg-red-E01414 w-[55%] h-72 mt-12 ml-7 rounded-2xl shadow-custom-dark relative">
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

          <h1 className="text-center mt-2 font-poppins text-white text-xl font-black">
            Battery Testing Stacked Bar Chart
          </h1>
          <div className="bg-white w-6/6 h-3/4 mr-5 mt-4 ml-5 rounded-2xl flex items-center justify-center">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        <div className="flex relative">
          <img
            className="left-5 mt-4 w-5 h-5 z-10 gambar-shadow-custom"
            src="../src/assets/picture3D/BatteryMonitorAll3D.png" // Pastikan jalur gambar benar
            alt="3D Human" // Tambahkan deskripsi alternatif untuk aksesibilitas
            style={{
              maxHeight: "330px", // Tinggi maksimum gambar
              maxWidth: "300px", // Lebar maksimum gambar
              width: "300px", // Atur lebar otomatis untuk menjaga rasio
              height: "350px", // Atur tinggi otomatis untuk menjaga rasio
              objectFit: "cover", // Menjaga rasio aspek gambar
            }}
          />

          <div className="absolute left-44">
            <div className="bg-red-E01414 w-[400px] h-32 mt-12 mr-7 ml-12 rounded-2xl shadow-custom-dark relative">
              {/* Lingkaran di kiri atas */}
              <div
                className="absolute top-2 right-3 bg-white rounded-full"
                style={{
                  width: "15px",
                  height: "15px",
                }}
              ></div>

              <h1 className="text-center mt-2 font-poppins text-white text-16px font-black">
                kWh Used Today
              </h1>
              <div className="bg-white w-[90%] h-20 mx-5 mt-2 rounded-2xl"></div>
            </div>

            <div className="bg-red-E01414 w-[400px] h-32 mt-5 mr-7 ml-12 rounded-2xl shadow-custom-dark relative">
              {/* Lingkaran di kanan atas */}
              <div
                className="absolute top-2 right-3 bg-white rounded-full"
                style={{
                  width: "15px",
                  height: "15px",
                }}
              ></div>

              <h1 className="text-center mt-2 font-poppins text-white text-16px font-black">
                Battery Charging Today
              </h1>
              <div className="bg-white w-[90%] h-20 mx-5 mt-2 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Monitor;
