import Platforms from "../components/dashboard/Platforms";
import ProjetStatic from "../components/dashboard/ProjectStatic";

const Dashboard = () => {
  return (
    <div className="p-5">
      <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-4">
        <ProjetStatic />
        <Platforms />
        <ProjetStatic />
        <Platforms />
      </div>
    </div>
  );
};

export default Dashboard;
