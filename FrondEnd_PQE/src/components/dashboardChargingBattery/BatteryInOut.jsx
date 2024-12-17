import { motion } from "framer-motion";
import data from "../../dataDummy/dailyBatteryInOut.json"; // Impor data dari file JSON

const BatteryInOut = () => {
  const sourceData = data; // Gunakan data dari file JSON

  return (
    <motion.div
      className="bg-opacity-100 backdrop-blur-md shadow-lg rounded-xl p-0 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-center bg-white rounded-2xl overflow-hidden">
          <thead>
            <tr>
              <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border border-red-700 py-2">
                No
              </th>
              <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border border-red-700 py-2">
                Date
              </th>
              <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border border-red-700 py-2">
                Battery In
              </th>
              <th className="bg-red-700 text-xs font-poppins font-bold text-white uppercase tracking-wider border border-red-700 py-2">
                Battery Out
              </th>
            </tr>
          </thead>
          <tbody>
            {sourceData.map((data, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } border-b border-gray-200`}
              >
                <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                  {index + 1}
                </td>
                <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                  {data.date}
                </td>
                <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                  {data.in}
                </td>
                <td className="px-2 py-1 text-xs font-poppins font-light text-black">
                  {data.out}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default BatteryInOut;
