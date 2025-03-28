import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = new Date();
      setTime(newTime);
      setSeconds(newTime.getSeconds());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format hours and minutes with leading zeros
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  const secondProgress = seconds / 60;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center space-y-6 p-4 max-w-xs mx-auto"
    >
      {/* Ultra-minimal time display */}
      <div className="relative">
        <div className="flex items-baseline">
          <span className="text-5xl font-thin tracking-tighter text-gray-800 dark:text-gray-100">
            {hours}
          </span>
          <span className="mx-1 text-5xl font-thin text-indigo-500 dark:text-indigo-400">
            :
          </span>
          <span className="text-5xl font-thin tracking-tighter text-gray-800 dark:text-gray-100">
            {minutes}
          </span>
          <span className="ml-2 text-xl font-thin text-gray-400 dark:text-gray-500">
            {formattedSeconds}
          </span>
        </div>

        {/* Animated line that moves with seconds */}
        <motion.div
          className="absolute -bottom-2 left-0 h-[2px] bg-indigo-500 dark:bg-indigo-400"
          initial={{ width: "0%" }}
          animate={{ width: `${secondProgress * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Minimal date and greeting */}
      <div className="flex flex-col items-center space-y-1">
        <motion.p
          className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {time.toLocaleDateString([], {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </motion.p>
      </div>

      {/* Minimal indicators for hours/minutes/seconds */}
      <div className="flex space-x-1 items-center">
        <div className="w-1 h-1 rounded-full bg-indigo-500 dark:bg-indigo-400" />
        <div className="w-8 h-[1px] bg-gray-200 dark:bg-gray-700" />
        <div className="w-1 h-1 rounded-full bg-purple-500 dark:bg-purple-400" />
        <div className="w-8 h-[1px] bg-gray-200 dark:bg-gray-700" />
        <div className="w-1 h-1 rounded-full bg-pink-500 dark:bg-pink-400" />
      </div>
    </motion.div>
  );
}
