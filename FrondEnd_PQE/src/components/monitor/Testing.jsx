import {RiFlashlightFill} from "react-icons/ri";

const Testing = ({ batteryLevel, charging }) => {
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
          <div className="relative w-24 h-36 bg-gray-300 rounded-md self-end ml-3 mr-80 transform translate-y-[20%] border-4 border-white-600">
            <div className="absolute inset-0 rounded-md overflow-hidden">
              <div
                className={`absolute bottom-0 left-0 right-0 ${gradientClass} ${animatedClass} shadow-liquid transition-all duration-300`}
                style={{ height: `${batteryLevel}%` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <RiFlashlightFill className="text-black text-4xl" />
              </div>
            </div>
          </div>
        </section>
      );
};

export default Testing;
