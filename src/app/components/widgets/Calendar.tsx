import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Calendar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      whileHover={{
        y: -5,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-orange-300/20 to-red-300/20 rounded-full -ml-20 -mt-20 blur-2xl"></div>
      <h2 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-orange-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Calendar
      </h2>
      <div className="text-center mb-3">
        <h3 className="text-lg font-medium text-gray-700">
          {time.toLocaleString("default", { month: "long" })}{" "}
          {time.getFullYear()}
        </h3>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div key={i} className="text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 35 }, (_, i) => {
          const d = new Date(
            time.getFullYear(),
            time.getMonth(),
            i - new Date(time.getFullYear(), time.getMonth(), 1).getDay() + 1
          );
          const isCurrentMonth = d.getMonth() === time.getMonth();
          const isToday = d.toDateString() === new Date().toDateString();

          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`
          aspect-square flex items-center justify-center rounded-full text-sm
          ${isCurrentMonth ? "text-gray-700" : "text-gray-300"}
          ${
            isToday
              ? "bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-sm"
              : ""
          }
          ${
            isCurrentMonth && !isToday ? "hover:bg-white/80 cursor-pointer" : ""
          }
        `}
            >
              {d.getDate()}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
