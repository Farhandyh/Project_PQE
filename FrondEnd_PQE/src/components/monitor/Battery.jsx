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
      <div className="relative w-full h-52 bg-container p-6 rounded-3xl grid grid-cols-2">
        <div>
          <p className="mb-2 text-sm text-black">Battery</p>
          <h1 className="text-biggest text-black">{batteryLevel}%</h1>
          <p className="absolute bottom-4 flex items-center gap-2 text-xs text-black">
            {statusText} {charging ? <RiFlashlightLine /> : <RiPlugLine />}
          </p>
        </div>
        <div className="relative w-16 h-36 bg-container shadow-battery-inner rounded-full self-end ml-auto transform translate-y-[-10%] ">
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div
              className={`absolute bottom-0 left-0 right-0 ${gradientClass} ${animatedClass} shadow-liquid transition-all duration-300`}
              style={{ height: `${batteryLevel}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Battery;
