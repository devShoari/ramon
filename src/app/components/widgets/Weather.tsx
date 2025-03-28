import { motion } from "framer-motion";
import { useState } from "react";

export default function Weather() {
  const [activeWidget, setActiveWidget] = useState(false);

  const handleWidgetFocus = () => {
    setActiveWidget(true);
  };

  const handleWidgetBlur = () => {
    setActiveWidget(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{
        y: -5,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50 overflow-hidden relative"
      onMouseEnter={handleWidgetFocus}
      onMouseLeave={handleWidgetBlur}
    >
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-10 -mt-10 blur-2xl"
        style={{
          background:
            "linear-gradient(to bottom right, var(--widget-gradient-1), var(--widget-gradient-2))",
        }}
      ></div>
      <h2 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ color: "var(--theme-primary)" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
        Weather
      </h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-5xl font-light text-gray-800 mb-1">72°</p>
          <p className="text-gray-600 text-lg">Sunny</p>
          <div className="flex items-center mt-4 text-sm text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            New York, NY
          </div>
        </div>
        <motion.div
          style={{ color: "var(--theme-primary)" }}
          animate={{
            rotate: activeWidget ? 360 : 0,
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </motion.div>
      </div>

      <div className="flex justify-between text-sm mt-4">
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
          <div key={index} className="text-center">
            <p className="text-gray-500">{day}</p>
            <p className="text-gray-800 font-medium">
              {[74, 70, 68, 75, 77][index]}°
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
