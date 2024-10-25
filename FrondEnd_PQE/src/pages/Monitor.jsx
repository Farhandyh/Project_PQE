import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Navbar from "../components/monitor/Navbar";

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Monitor = () => {
    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Battery Usage (kWh)',
                data: [12, 19, 3, 5, 2, 3],
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
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
                position: 'top',
            },
            title: {
                display: true,
                text: 'Battery Usage Over Time',
            },
        },
    };

    // Data for the Stacked Bar Chart
    const barData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Charging',
                data: [5, 10, 3, 4, 2, 5],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Discharging',
                data: [3, 5, 2, 3, 1, 2],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label: 'Idle',
                data: [4, 7, 1, 2, 3, 4],
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Battery Status Over Time',
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
            <Navbar />
            <div className="flex">
                <div className="bg-red-E01414 w-2/6 h-72 mt-24 ml-7 rounded-2xl">
                    <h1 className="text-center mt-4 font-poppins text-white text-xl font-bold">Battery Storage Monitoring</h1>
                    <div className="bg-white w-6/6 h-3/4 mr-5 mt-2 ml-5 rounded-2xl">
                        <h1 className="font-poppins font-extrabold text-6xl text-red-800 text-right mr-10 pt-5">036</h1>
                        <table className="min-w-full bg-white border mt-4 border-gray-200 h-2">
                            <thead>
                                <tr>
                                    <th className="bg-red-700 text-center text-xs font-semibold text-white uppercase tracking-wider border-b border-white">
                                        No
                                    </th>
                                    <th className="bg-red-700 text-center text-xs font-semibold text-white uppercase tracking-wider border-b border-white">
                                        Time In
                                    </th>
                                    <th className="bg-red-700 text-center text-xs font-semibold text-white uppercase tracking-wider border-b border-white">
                                        Time Out
                                    </th>
                                    <th className="bg-red-700 text-center text-xs font-semibold text-white uppercase tracking-wider border-b border-white">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200 bg-red-300">
                                    <td className="px-6 text-sm font-medium text-white">
                                        1
                                    </td>
                                    <td className="px-6 text-sm font-medium text-white">
                                        10:00
                                    </td>
                                    <td className="px-6 text-sm font-medium text-white">
                                        6:00 
                                    </td>
                                    <td className="px-6 text-sm font-medium text-white">
                                        Present
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 bg-red-300">
                                    <td className="px-6 text-sm font-medium text-white">
                                        2
                                    </td>
                                    <td className="px-6 text-sm font-medium text-white">
                                        11:00
                                    </td>
                                    <td className="px-6 text-sm font-medium text-white">
                                        7:00
                                    </td>
                                    <td className="px-6 text-sm font-medium text-white">
                                        Late
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="bg-red-E01414 w-full h-72 mt-24 ml-7 rounded-2xl mr-7">
                    <h1 className="text-center mt-4 font-mono text-white text-xl font-bold">Battery Line Chart</h1>
                    <div className="bg-white w-6/6 h-3/4 mr-5 mt-2 ml-5 rounded-2xl flex items-center justify-center">
                        <Line data={lineData} options={lineOptions} />
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="bg-red-E01414 w-full h-72 mt-12 ml-7 rounded-2xl">
                    <h1 className="text-center mt-4 font-mono text-white text-xl font-bold">Battery Testing Stacked Bar Chart</h1>
                    <div className="bg-white w-6/6 h-3/4 mr-5 mt-2 ml-5 rounded-2xl flex items-center justify-center">
                        <Bar data={barData} options={barOptions} />
                    </div>
                </div>
                <div className="bg-red-E01414 w-2/6 h-72 mt-12 mr-7 ml-7 rounded-2xl">
                    <h1 className="text-center mt-4 font-mono text-white text-xl font-bold">Battery Storage Monitoring</h1>
                    <div className="bg-white w-6/6 h-3/4 mr-5 mt-2 ml-5 rounded-2xl"></div>
                </div>
            </div>
        </>
    );
};

export default Monitor;
