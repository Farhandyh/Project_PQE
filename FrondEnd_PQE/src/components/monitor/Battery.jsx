import { RiFlashlightLine, RiPlugLine } from "react-icons/ri";

const Battery = ({ batteryLevel, charging }) => {
  const statusText = charging ? "Charging" : "Not Charging";
  const gradientClass =
    batteryLevel <= 20
      ? "bg-gradient-red"
      : batteryLevel <= 40
      ? "bg-gradient-orange"
      : batteryLevel <= 80
      ? "bg-gradient-yellow"
      : "bg-gradient-green";

  const animatedClass = charging
    ? "animate-charging"
    : batteryLevel <= 20
    ? "animate-low-battery"
    : "";

  return (
    <section className="flex items-center justify-center">
      <div className="relative w-full h-52 bg-gray-100 p-5 rounded-3xl shadow-lg grid grid-cols-2">
        <div>
          <p className="mb-1 text-sm text-gray-600">Battery</p>
          <h1 className="text-2xl font-bold text-gray-800">{batteryLevel}%</h1>
          <p className="absolute bottom-4 flex items-center gap-1 text-xs text-gray-600">
            {statusText} {charging ? <RiFlashlightLine /> : <RiPlugLine />}
          </p>
        </div>
        <div className="relative w-16 h-36 bg-gray-300 shadow-inner rounded-full self-end ml-auto transform translate-y-[-10%] border border-gray-300">
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div
              className={`absolute bottom-0 left-0 right-0 ${gradientClass} ${animatedClass} shadow-lg transition-all duration-300`}
              style={{ height: `${batteryLevel}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Battery;
