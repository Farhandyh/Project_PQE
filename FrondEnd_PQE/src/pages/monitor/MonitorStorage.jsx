import { Pie } from "react-chartjs-2";
//import Utils from 'path/to/utils';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const MonitorStorage = () => {
  const data = {
    labels: ["Check-in", "Check-out"],
    datasets: [
      {
        data: [60, 40], // Data manual
        backgroundColor: ['#c01c1c', '#f9e67d'],
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Posisikan legend di atas
        align: 'start',  // Pastikan labelnya horizontal
        labels: {
          boxWidth: 20,  // Lebar kotak warna di legend
          padding: 15,   // Jarak antar label
        },
      },
    },
  };

  
  
  return (
    <>
      <div className="flex flex-col mr-3 ml-3">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-6 mt-24">
          <div className="w-full lg:w-1/3 bg-red-E01414 h-48 rounded-2xl relative">
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
              Total Battery
            </h1>
            <div className="flex h-full">
              <div className="bg-white w-full h-32 mt-2 ml-3 mr-3 rounded-2xl overflow-hidden">
                <div className="flex flex-row items-start h-auto justify-between">
                  <img
                    className="w-18 max-w-[120px] max-h-[125px] object-cover"
                    src="../src/assets/picture3D/BatteryStorage3.png" // Pastikan jalur gambar benar
                    alt="3D Human" // Tambahkan deskripsi alternatif untuk aksesibilitas
                  />
                  <div className="flex flex-col items-start mr-3 mt-2 h-full">
                    {/* Tambahkan margin untuk jarak antara gambar dan teks */}
                    <h2 className="font-poppins font-extrabold text-16px text-red-800 text-right mr-2 sm:text-sm md:text-16px">
                      Battery Availability
                    </h2>
                    <h1 className="font-poppins text-shadow-custom font-extrabold -mt-6 text-88px text-red-800 text-right md:text-px">
                      036
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 bg-red-E01414 h-48 rounded-2xl relative">
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
              Battery in storage
            </h1>
            <div className="flex h-full">
              <div className="bg-white w-full h-32 mt-2 ml-3 mr-3 rounded-2xl overflow-hidden">
                <div className="flex flex-row items-start h-auto justify-between">
                  <img
                    className="w-18 max-w-[120px] max-h-[125px] object-cover"
                    src="../src/assets/picture3D/BatteryStorage3.png" // Pastikan jalur gambar benar
                    alt="3D Human" // Tambahkan deskripsi alternatif untuk aksesibilitas
                  />
                  <div className="flex flex-col items-start mr-3 mt-2 h-full">
                    {/* Tambahkan margin untuk jarak antara gambar dan teks */}
                    <h2 className="font-poppins font-extrabold text-16px text-red-800 text-right mr-2 sm:text-sm md:text-16px">
                      Battery Availability
                    </h2>
                    <h1 className="font-poppins text-shadow-custom font-extrabold -mt-6 text-88px text-red-800 text-right md:text-60px">
                      026
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 bg-red-E01414 h-48 rounded-2xl relative">
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
              Battery in use
            </h1>
            <div className="flex h-full">
              <div className="bg-white w-full h-32 mt-2 ml-3 mr-3 rounded-2xl overflow-hidden">
                <div className="flex flex-row items-start h-auto justify-between">
                  <img
                    className="w-18 max-w-[120px] max-h-[125px] object-cover"
                    src="../src/assets/picture3D/BatteryStorage3.png" // Pastikan jalur gambar benar
                    alt="3D Human" // Tambahkan deskripsi alternatif untuk aksesibilitas
                  />
                  <div className="flex flex-col items-start mr-3 mt-2 h-full">
                    {/* Tambahkan margin untuk jarak antara gambar dan teks */}
                    <h2 className="font-poppins font-extrabold text-16px text-red-800 text-right mr-2 sm:text-sm md:text-16px">
                      Battery Availability
                    </h2>
                    <h1 className="font-poppins text-shadow-custom font-extrabold -mt-6 text-88px text-red-800 text-right md:text-60px">
                      010
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        {/* END */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-6 mt-18 mr-3 lg:mt-4">
          {/* Card 3 */}
          <div className="bg-red-E01414 w-full lg:w-3/6 max-w-full h-72 mt-4 sm:mt-4 lg:mt-4 ml-3 lg:ml-0 p-4 rounded-2xl shadow-custom-dark relative">
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

            <h1 className="text-center items-start -mt-2 font-poppins text-white text-xl font-black">
              Battery In/Out Log 
            </h1>
            <div className="bg-white w-6/6 h-5/6 mt-4 rounded-2xl flex items-center justify-center">
                <table className="w-[95%] h-[85%] text-center bg-white rounded-2xl overflow-hidden">
                  <thead>
                    <tr>
                      <th className="py-2 bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-white">
                        No
                      </th>
                      <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-white">
                        Name
                      </th>
                      <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-white">
                        Date
                      </th>
                      <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-white">
                        Check-in
                      </th>
                      <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border-b border-white">
                        Check-out
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 bg-gray-100">
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        1
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        Battery A
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        11/10/2024
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        -
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        11:39 AM
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-100">
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        2
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        Battery A
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        11/10/2024
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        10:39 PM
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        -
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-100">
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        3
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        Battery B
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        11/10/2024
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        -
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        03:39 AM
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-100">
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        4
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        Battery C
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        11/10/2024
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        -
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        03:39 AM
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-100">
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        5
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        Battery D
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        11/10/2024
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        -
                      </td>
                      <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                        03:39 AM
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex w-full lg:w-3/6 h-full relative">
            <img
              className="absolute w-5 h-5 z-10 gambar-shadow-custom"
              src="../src/assets/picture3D/BatteryMonitorAll3D.png" // Pastikan jalur gambar benar
              alt="3D Human" // Tambahkan deskripsi alternatif untuk aksesibilitas
              style={{
                maxHeight: "100px", // Tinggi maksimum gambar
                maxWidth: "110px", // Lebar maksimum gambar
                width: "100%", // Lebar gambar 100% dari kontainer
                height: "auto", // Tinggi otomatis untuk menjaga rasio
                objectFit: "cover", // Menjaga rasio aspek gambar
              }}
            />
            <div className="absolute bg-red-E01414 w-full h-72 mt-4 p-4 rounded-2xl shadow-custom-dark relative ">
                {/* Lingkaran di kiri atas */}
                <div
                  className="absolute top-2 right-3 bg-white rounded-full"
                  style={{
                    width: "15px",
                    height: "15px",
                  }}
                ></div>

                <h1 className="text-center items-start -mt-2 font-poppins text-white text-xl font-black">
                  Battery Status
                </h1>
                <div className="bg-white w-full h-5/6 mt-4 rounded-2xl flex items-center justify-center">
                  <Pie data={data} options={options} />
                </div>
              </div>
            </div>
              

      </div>
          
      </div>
    </>
  );
};

export default MonitorStorage;