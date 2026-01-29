import { useState } from "react";

const Current = ({ hourly, weatherIcons, location }) => {
  //   const gradientMap = {
  //     0: "bg-gradient-to-r from-yellow-200 to-orange-400",
  //     1: "bg-gradient-to-r from-yellow-200 to-orange-400",
  //     2: "bg-gradient-to-r from-sky-0 to-blue-200",
  //     3: "bg-gradient-to-r from-sky-0 to-blue-200",
  //     45: "bg-gradient-to-r from-gray-100 to-gray-500",
  //     61: "bg-gradient-to-r from-blue-100 to-blue-600",
  //     63: "bg-gradient-to-r from-blue-100 to-blue-600",
  //     80: "bg-gradient-to-r from-blue-100 to-blue-600",
  //     71: "bg-gradient-to-r from-white to-gray-300",
  //   };

  //   const code = hourly[0]?.code?.toString();
  //   const gradientClass = code
  //     ? gradientMap[code] || "bg-gray-100"
  //     : "bg-gray-100";

  //   console.log(code);

  return (
    <div
      className={`Localtion flex items-center justify-between w-120 shadow-sm px-9 py-9 rounded-4xl overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200`}
    >
      <div>
        <h1 className="text-6xl font-medium mb-2">
          {hourly[0] ? `${hourly[0].temp}° ` : "Caricamento...."}
        </h1>
        <p className="text-gray-400">{location}</p>
      </div>
      <div>
        <p className="text-8xl">{weatherIcons[hourly[0]?.code]}</p>
      </div>
    </div>
  );
};

export default Current;
