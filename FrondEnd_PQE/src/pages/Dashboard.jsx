import Platforms from "../components/dashboard/Platforms";
import ProjetStatic from "../components/dashboard/ProjectStatic";
import ProjectCard from "../components/dashboard/cardDashboard/ProjectCard";
import ClientCard from "../components/dashboard/cardDashboard/ClientCard";
import MemberCard from "../components/dashboard/cardDashboard/MemberCard";
import { Chart as ChartJS, defaults } from "chart.js/auto";

import { motion } from "framer-motion";
import { FiZap, FiShoppingBag, FiUsers, FiBarChart2 } from "react-icons/fi";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import revenueData from "../dataDummy/revenueData.json";
import sourceData from "../dataDummy/sourceData.json";

import "../styleCss/DashboardHome/DashboardHome.css";
import StatCard from "../components/common/StatCard";
import LineChart from "../components/dashboardHome/LineChart";
import CategoryDistributionChart from "../components/dashboardHome/CategoryDistributionChart";
import BarChart from "../components/dashboardHome/BarChart";
const projects = [
  {
    name: "Website Redesign",
    type: "Web Development",
    date: "2024-03-15",
    members: ["Nazheef", "Naufal", "Ariq"],
    files: 4,
    progress: 20,
  },
  {
    name: "Mobile App Development",
    type: "Mobile Application",
    date: "2024-02-10",
    members: ["Reva", "Lina", "Zahra"],
    files: 9,
    progress: 80,
  },
  {
    name: "Marketing Capaign",
    type: "Marketing",
    date: "2024-04-25",
    members: ["Grace", "Henry", "Bima"],
    files: 1,
    progress: 18,
  },
  {
    name: "Product Launch",
    type: "Product Management",
    date: "2024-04-15",
    members: ["Nazheef", "Naufal", "Ariq"],
    files: 4,
    progress: 20,
  },
];
const clients = [
  {
    name: "ABC Corporation",
    title: "CEO",
    date: "2024-04-10T09:00:00Z",
  },
  {
    name: "XYZ Company",
    title: "Marketing Director",
    date: "2024-03-20T14:30:00Z",
  },
  {
    name: "123 Industries",
    title: "Project Manager",
    date: "2024-05-05T11:15:00Z",
  },
  {
    name: "Tech Innovations Ltd.",
    title: "CTO",
    date: "2024-02-15T10:45:00Z",
  },
];
const members = [
  {
    total_members: 4,
    job: "UI Designer",
  },
  {
    total_members: 8,
    job: "Frontend Developer",
  },
  {
    total_members: 3,
    job: "Backend Developer",
  },
  {
    total_members: 6,
    job: "Mobile App Developer",
  },
];
const Dashboard = () => {
  return (
    <div className="p-5">
      <div className="max-w-full mx-auto px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="col-span-1 bg-white p-6 rounded-lg shadow-md border border-gray-700">
            <StatCard
              name="Total Sales"
              icon={FiZap}
              value="$12,345"
              color="#6366F1"
            />
          </div>
          <div className="col-span-1 bg-white p-6 rounded-lg shadow-md border border-gray-700">
            <StatCard
              name="New Users"
              icon={FiUsers}
              value="1,234"
              color="#8B5CF6"
            />
          </div>
          <div className="col-span-1 bg-white p-6 rounded-lg shadow-md border border-gray-700">
            <StatCard
              name="Total Products"
              icon={FiShoppingBag}
              value="567"
              color="#EC4899"
            />
          </div>
          <div className="col-span-1 bg-white p-6 rounded-lg shadow-md border border-gray-700">
            <StatCard
              name="Conversion Rate"
              icon={FiBarChart2}
              value="12.5%"
              color="#10B981"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="w-full">
            <BarChart sourceData={sourceData} />
          </div>
          <div className="w-full">
            <CategoryDistributionChart />
          </div>
          <div className="lg:col-span-2 w-full">
            <LineChart revenueData={revenueData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
