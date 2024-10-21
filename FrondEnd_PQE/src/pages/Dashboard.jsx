/* eslint-disable react/jsx-key */
import Platforms from "../components/dashboard/Platforms";
import ProjetStatic from "../components/dashboard/ProjectStatic";
import ProjectCard from "../components/dashboard/cardDashboard/ProjectCard";
import ClientCard from "../components/dashboard/cardDashboard/ClientCard";
import MemberCard from "../components/dashboard/cardDashboard/MemberCard";

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
      <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-4">
        <ProjetStatic />
        <Platforms />
        <ProjetStatic />
        <Platforms />
      </div>

      <div>
        <div className="flex justify-between items-center py-4">
          <h1 className="text-lg font-semibold">Current Projects</h1>
          <p className="text-sm underline text-indigo-600">See All</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {projects &&
            projects.map((project) => <ProjectCard project={project} />)}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center py-4">
          <h1 className="text-lg font-semibold">Current Clients</h1>
          <p className="text-sm underline text-indigo-600">See All</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {clients && clients.map((client) => <ClientCard client={client} />)}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center py-4">
          <h1 className="text-lg font-semibold">Members</h1>
          <p className="text-sm underline text-indigo-600">See All</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {members && members.map((member) => <MemberCard member={member} />)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
