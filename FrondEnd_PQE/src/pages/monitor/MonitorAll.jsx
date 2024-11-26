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
import { useState, useEffect } from "react";

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
  const [storage, setStorage] = useState([]);

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

  const fetchStorage = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/monitor");
      if (!response.ok) {
        throw new Error("Failed to fetch storage data");
      }
      const data = await response.json();
      setStorage(data); // Pastikan 'data' adalah array
    } catch (error) {
      console.error(error);
    }
  };  

  useEffect(() => {
    fetchStorage();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-0 md:ml-7">
        <div className="bg-red-E01414 w-full max-w-md h-auto mt-32 sm:mt-32 lg:mt-24 ml-5 lg:ml-0 p-4 rounded-2xl shadow-custom-dark relative">
          {/* Lingkaran di kiri atas */}
          <div
            className="absolute top-2 left-3 bg-white rounded-full"
            style={{
              width: "15px",
              height: "15px",
            }}
          ></div>
          {/* Lingkaran di kanan atas */}
          <div
            className="absolute top-2 right-3 bg-white rounded-full"
            style={{
              width: "15px",
              height: "15px",
            }}
          ></div>
          <h1 className="text-center font-poppins text-white text-lg md:text-16px font-black">
            Battery Storage Monitoring
          </h1>
          <div className="bg-white w-full h-auto p-3 mt-2 rounded-3xl shadow-lg">
            <div className="flex flex-row -mt-4 items-start justify-between">
              {/* Kotak untuk gambar */}
              <div className="w-1/2 p-2 flex justify-start">
                <img
                  className="w-96 max-w-[160px] max-h-[150px] object-cover"
                  src="../src/assets/picture3D/human3D.png"
                  alt="3D Human"
                />
              </div>

              {/* Kotak untuk teks */}
              <div className="w-1/2 p-4 flex flex-col items-center justify-center mr-5">
                <h2
                  className="font-poppins font-extrabold text-red-800 text-center"
                  style={{
                    fontSize: "clamp(1.2rem, 2vw + 1rem, 1.2rem)", // Minimum 1rem, responsif, maksimum 1.5rem
                  }}
                >
                  Actual Battery
                </h2>
                <h1
                  className="font-poppins text-shadow-custom font-extrabold -mt-2 text-red-800 text-center"
                  style={{
                    padding: 0,
                    margin: -19,
                    fontSize: "clamp(6rem, 6vw, 6rem)", // Minimum 2rem, responsif, maksimum 5rem
                  }}
                >
                  036
                </h1>
              </div>
            </div>

            <div className="-mt-4">
              <h2 className="font-poppins font-bold text-sm text-red-800 text-left ml-2">
                Battery In/Out Log:
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-center bg-white rounded-2xl overflow-hidden">
                  <thead>
                    <tr>
                      <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-white">
                        No
                      </th>
                      <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-white">
                        Name
                      </th>
                      <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-white">
                        Date
                      </th>
                      <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-white">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {storage.map((item, index) => (
                      <tr key={index}>
                        <td className="py-2 px-2 border-b whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="py-2 px-2 border-b whitespace-nowrap">
                          {item.batteryMerk}
                        </td>
                        <td className="py-2 px-2 border-b whitespace-nowrap">
                          {item.date}
                        </td>
                        <td className="py-1 px-2 border-b">
                          {item.batteryStatus === 1 ? "In" : "Out"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-E01414 w-full max-w-100 h-85 mt-4 sm:mt-32 lg:mt-24 ml-5 rounded-2xl mr-7 shadow-custom-dark relative">
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
          <h1 className="text-center mt-2 font-poppins text-white text-xl md:text-16px font-black">
            Battery Charging Line Chart
          </h1>
          <div className="bg-white w-6/6 h-3/4 mr-5 mt-3 ml-5 rounded-2xl flex items-center justify-center">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-4">
        {/* Card 3 */}
        <div className="bg-red-E01414 w-full max-w-4xl h-72 mt-4 sm:mt-20 md:mt-6 lg:mt-10 ml-5 lg:ml-0 p-4 rounded-2xl shadow-custom-dark relative">
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

          <h1 className="text-center items-start -mt-2 font-poppins text-white text-xl md:text-16px font-black">
            Battery Testing Bar Chart
          </h1>
          <div className="bg-white w-6/6 h-5/6 mr-5 mt-4 ml-5 rounded-2xl flex items-center justify-center">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Card 4 */}

        <div className="flex w-full max-w-xl h-80 mt-0 md:-mt-6 lg:-mt-2 relative">
          <img
            className="mt-14 md:mt-28 lg:mt-8 z-10 gambar-shadow-custom max-h-[220px] max-w-[180px] w-auto h-auto object-cover
               md:max-h-[200px] md:max-w-[180px]
               lg:max-h-[330px] lg:max-w-[300px]"
            src="../src/assets/picture3D/BatteryMonitorAll3D.png" // Pastikan jalur gambar benar
            alt="3D Human" // Tambahkan deskripsi alternatif untuk aksesibilitas
          />

          <div className="absolute left-24 sm:left-24 md:left-32 lg:left-36">
            <div className="bg-red-E01414 w-[100%] sm:w-[110%] lg:w-[135%] h-32 mt-12 mr-7 ml-12 md:ml-0 lg:ml-12 rounded-2xl shadow-custom-dark relative">
              {/* Lingkaran di kiri atas */}
              <div
                className="absolute top-2 right-3 bg-white rounded-full"
                style={{
                  width: "15px",
                  height: "15px",
                }}
              ></div>

              <h1 className="text-center mt-2 font-poppins text-white text-16px md:text-16px lg:text-16px font-black">
                kWh Used Today
              </h1>
              <div className="bg-white w-[90%] h-20 mx-5 mt-2 rounded-2xl"></div>
            </div>

            <div className="bg-red-E01414 w-[100%] sm:w-[110%] md:w-[110%] lg:w-[135%] h-32 mt-5 mr-7 ml-12 md:ml-0 lg:ml-12 rounded-2xl shadow-custom-dark relative">
              {/* Lingkaran di kanan atas */}
              <div
                className="absolute top-2 right-3 bg-white rounded-full"
                style={{
                  width: "15px",
                  height: "15px",
                }}
              ></div>

              <h1 className="text-center mt-2 font-poppins text-white text-16px md:text-16px lg:text-16px font-black">
                Battery Charging Today
              </h1>
              <div className="bg-white w-[90%] h-20 mx-5 mt-2 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
