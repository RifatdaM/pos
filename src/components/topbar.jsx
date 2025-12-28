import React, { useEffect, useState } from "react";

const Topbar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <nav className="w-full bg-blue-600 px-6 py-3 ">
      <div className="flex items-center justify-between text-white  container mx-auto">
        <p className="font-semibold 8">Abstract - POS</p>

        <div className="flex items-center gap-2 text-sm">
          <button className="flex items-center gap-1 cursor-pointer">
            🏠 Dashboard
          </button>

          <p className="px-3 py-1 rounded-md">
            {time.toLocaleString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })}
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
