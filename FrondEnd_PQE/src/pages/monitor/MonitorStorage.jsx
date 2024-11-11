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

const MonitorStorage = () => {
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
      <div className="flex mr-3">
        <div className="bg-red-E01414 w-2/6 h-48 mt-24 ml-7 rounded-2xl relative">
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
            Total Battery
          </h1>
          <div className="flex h-full">
            <div className="bg-white w-full h-32 mt-2 ml-3 mr-3 rounded-2xl overflow-hidden">
              <div className="flex justify-between">
                <img
                  className=" left-8 w-1/2 h-full z-10 gambar-shadow-custom"
                  src="../src/assets/picture3D/BatteryStorage3.png" // Pastikan jalur gambar benar
                  alt="3D Human" // Tambahkan deskripsi alternatif untuk aksesibilitas
                  style={{
                    maxHeight: "120px", // Tinggi maksimum gambar
                    maxWidth: "100px", // Lebar maksimum gambar
                    width: "300px", // Atur lebar otomatis untuk menjaga rasio
                    height: "150px", // Atur tinggi otomatis untuk menjaga rasio
                    objectFit: "cover", // Menjaga rasio aspek gambar
                  }}
                />

                <div className="flex flex-col items-start mr-3 mt-2 h-full">
                  {/* Tambahkan margin untuk jarak antara gambar dan teks */}
                  <h2 className="font-poppins font-extrabold text-16px text-red-800 text-right mr-2">
                    Battery Availability
                  </h2>
                  <h1 className="font-poppins text-shadow-custom font-extrabold -mt-6 text-88px text-red-800 text-right">
                    026
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-red-E01414 w-2/6 h-48 mt-24 ml-7 rounded-2xl relative">
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
            Total Battery
          </h1>
          <div className="flex h-full">
            <div className="bg-white w-full h-32 mt-2 ml-3 mr-3 rounded-2xl overflow-hidden">
              <div className="flex justify-between">
                <img
                  className=" left-8 w-1/2 h-full z-10 gambar-shadow-custom"
                  src="../src/assets/picture3D/BatteryStorage3.png" // Pastikan jalur gambar benar
                  alt="3D Human" // Tambahkan deskripsi alternatif untuk aksesibilitas
                  style={{
                    maxHeight: "120px", // Tinggi maksimum gambar
                    maxWidth: "100px", // Lebar maksimum gambar
                    width: "300px", // Atur lebar otomatis untuk menjaga rasio
                    height: "150px", // Atur tinggi otomatis untuk menjaga rasio
                    objectFit: "cover", // Menjaga rasio aspek gambar
                  }}
                />

                <div className="flex flex-col items-start mr-3 mt-2 h-full">
                  {/* Tambahkan margin untuk jarak antara gambar dan teks */}
                  <h2 className="font-poppins font-extrabold text-16px text-red-800 text-right mr-2">
                    Battery Availability
                  </h2>
                  <h1 className="font-poppins text-shadow-custom font-extrabold -mt-6 text-88px text-red-800 text-right">
                    026
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-red-E01414 w-2/6 h-48 mt-24 ml-7 rounded-2xl relative">
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
            Total Battery
          </h1>
          <div className="flex h-full">
            <div className="bg-white w-full h-32 mt-2 ml-3 mr-3 rounded-2xl overflow-hidden">
              <div className="flex justify-between">
                <img
                  className=" left-8 w-1/2 h-full z-10 gambar-shadow-custom"
                  src="../src/assets/picture3D/BatteryStorage3.png" // Pastikan jalur gambar benar
                  alt="3D Human" // Tambahkan deskripsi alternatif untuk aksesibilitas
                  style={{
                    maxHeight: "120px", // Tinggi maksimum gambar
                    maxWidth: "100px", // Lebar maksimum gambar
                    width: "300px", // Atur lebar otomatis untuk menjaga rasio
                    height: "150px", // Atur tinggi otomatis untuk menjaga rasio
                    objectFit: "cover", // Menjaga rasio aspek gambar
                  }}
                />
                <div className="flex flex-col items-start mr-3 mt-2 h-full">
                  {/* Tambahkan margin untuk jarak antara gambar dan teks */}
                  <h2 className="font-poppins font-extrabold text-16px text-red-800 text-right mr-2">
                    Battery Availability
                  </h2>
                  <h1 className="font-poppins text-shadow-custom font-extrabold -mt-6 text-88px text-red-800 text-right">
                    026
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END */}
      <div className="flex flex-col items-end">
            <img
              className="absolute top-64 left-12 w-5 h-12 z-10 gambar-shadow-custom"
              src="../src/assets/picture3D/Suitcase.png" // Pastikan jalur gambar benar
              alt="3D batteryStorage" // Tambahkan deskripsi alternatif untuk aksesibilitas
              style={{
                maxWidth: "440px", // Lebar maksimum gambar
                width: "750px", // Atur lebar otomatis untuk menjaga rasio
                height: "490px", // Atur tinggi otomatis untuk menjaga rasio
                objectFit: "cover", // Menjaga rasio aspek gambar
              }}
            />
        <div className="bg-red-E01414 w-3/6 h-48 mt-3 ml-7 mr-2 rounded-2xl relative">
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
              className="absolute left-5 bottom-1 w-5 h-5 z-10 gambar-shadow-custom"
              src="../src/assets/picture3D/BatteryMonitorAll3D.png" // Pastikan jalur gambar benar
              alt="3D batteryStorage" // Tambahkan deskripsi alternatif untuk aksesibilitas
              style={{
                maxWidth: "150px", // Lebar maksimum gambar
                width: "350px", // Atur lebar otomatis untuk menjaga rasio
                height: "180px", // Atur tinggi otomatis untuk menjaga rasio
                objectFit: "cover", // Menjaga rasio aspek gambar
              }}
            />
            <h1 className="text-center mt-4 font-poppins text-white text-xl font-black">
              Battery on storage
            </h1>
            <div className="flex h-full">
            <div className="bg-white w-full h-32 mt-2 ml-3 mr-3 rounded-2xl">
            <div className="flex flex-col items-end mr-64">
              {/* Tambahkan margin untuk jarak antara gambar dan teks */}
              <h2 className="font-poppins font-extrabold text-16px text-red-800 text-right mr-2">
                Battery Availability
              </h2>
              <h1 className="font-poppins text-shadow-custom font-extrabold -mt-6 text-88px text-red-800 text-right">
                036
              </h1>
            </div>
            </div>
          </div>
        </div>

        <div className="bg-red-E01414 w-4/6 h-52 mt-3 mr-2 ml-3 rounded-2xl relative">
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
            Battery Storage Monitoring
          </h1>
          <div className="bg-white w-6/6 h-32 mr-5 mt- ml-5 rounded-2xl">
            <table className="w-full bg-white border border-gray-200 h-4 rounded-2xl overflow-hidden mt-2">
              <thead>
                <tr>
                  <th className="px-6 bg-red-700 text-left text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-200">
                    No
                  </th>
                  <th className="px-6 bg-red-700 text-left text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-200">
                    Time In
                  </th>
                  <th className="px-6 bg-red-700 text-left text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-200">
                    Time Out
                  </th>
                  <th className="px-6 bg-red-700 text-left text-xs font-semibold text-white uppercase tracking-wider border-b border-gray-200">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 bg-red-300">
                  <td className="px-6 text-sm font-medium text-white">1</td>
                  <td className="px-6 text-sm font-medium text-white">10:00</td>
                  <td className="px-6 text-sm font-medium text-white">6:00</td>
                  <td className="px-6 text-sm font-medium text-white">
                    Present
                  </td>
                </tr>
                <tr className="border-b border-gray-200 bg-red-300">
                  <td className="px-6 text-sm font-medium text-white">2</td>
                  <td className="px-6 text-sm font-medium text-white">11:00</td>
                  <td className="px-6 text-sm font-medium text-white">7:00</td>
                  <td className="px-6 text-sm font-medium text-white">Late</td>
                </tr>
              </tbody>
            </table>
            </div>
        </div>
      </div>
    </>
  );
};

export default MonitorStorage;
