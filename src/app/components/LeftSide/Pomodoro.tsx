import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"work" | "shortBreak" | "longBreak">("work");
  const [showNotification, setShowNotification] = useState(false);
  const [showCustomTimeModal, setShowCustomTimeModal] = useState(false);
  const [customWorkMinutes, setCustomWorkMinutes] = useState(25);
  const [customShortBreakMinutes, setCustomShortBreakMinutes] = useState(5);
  const [customLongBreakMinutes, setCustomLongBreakMinutes] = useState(15);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Calculate progress percentage for the circular indicator
  const totalSeconds =
    mode === "work"
      ? customWorkMinutes * 60
      : mode === "shortBreak"
      ? customShortBreakMinutes * 60
      : customLongBreakMinutes * 60;
  const currentSeconds = minutes * 60 + seconds;
  const progress = 1 - currentSeconds / totalSeconds;

  // Get color based on current mode
  const getModeColor = () => {
    if (mode === "work")
      return { bg: "bg-red-500", text: "text-red-600", light: "bg-red-100" };
    if (mode === "shortBreak")
      return {
        bg: "bg-green-500",
        text: "text-green-600",
        light: "bg-green-100",
      };
    return { bg: "bg-blue-500", text: "text-blue-600", light: "bg-blue-100" };
  };

  useEffect(() => {
    // Initialize audio for notification
    audioRef.current = new Audio("/sounds/bell.mp3"); // Add a sound file to your public folder

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            clearInterval(interval);
            setIsActive(false);

            // Play sound notification
            if (audioRef.current) {
              audioRef.current
                .play()
                .catch((e) => console.log("Audio play failed:", e));
            }

            // Show visual notification
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval!);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === "work") setMinutes(customWorkMinutes);
    else if (mode === "shortBreak") setMinutes(customShortBreakMinutes);
    else setMinutes(customLongBreakMinutes);
    setSeconds(0);
  };

  const setTimerMode = (newMode: "work" | "shortBreak" | "longBreak") => {
    setIsActive(false);
    setMode(newMode);
    if (newMode === "work") {
      setMinutes(customWorkMinutes);
    } else if (newMode === "shortBreak") {
      setMinutes(customShortBreakMinutes);
    } else {
      setMinutes(customLongBreakMinutes);
    }
    setSeconds(0);
  };

  const saveCustomTimes = () => {
    // Update current timer if needed
    if (mode === "work") setMinutes(customWorkMinutes);
    else if (mode === "shortBreak") setMinutes(customShortBreakMinutes);
    else setMinutes(customLongBreakMinutes);

    setSeconds(0);
    setShowCustomTimeModal(false);
  };

  const modeColor = getModeColor();

  return (
    <div className="pomodoro p-6 relative overflow-hidden">
      {/* Mode selector */}
      <div className="flex justify-center mb-6 relative z-10">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          <motion.button
            onClick={() => setTimerMode("work")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              mode === "work"
                ? "bg-red-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Work
          </motion.button>
          <motion.button
            onClick={() => setTimerMode("shortBreak")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              mode === "shortBreak"
                ? "bg-green-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Short Break
          </motion.button>
          <motion.button
            onClick={() => setTimerMode("longBreak")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              mode === "longBreak"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Long Break
          </motion.button>
        </div>
      </div>

      {/* Timer display with circular progress */}
      <div className="flex justify-center mb-8 relative z-10">
        <div className="relative">
          {/* Circular progress background */}
          <svg className="w-48 h-48" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#a7a7a7"
              strokeWidth="8"
            />

            {/* Animated progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={
                mode === "work"
                  ? "#ef4444"
                  : mode === "shortBreak"
                  ? "#10b981"
                  : "#3b82f6"
              }
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={283} // 2 * PI * r
              strokeDashoffset={283 * (1 - progress)}
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 283 * (1 - progress) }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </svg>

          {/* Timer text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-light tracking-tight">
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
              </div>
              <div className={`text-sm mt-1 ${modeColor.text}`}>
                {mode === "work"
                  ? "Focus Time"
                  : mode === "shortBreak"
                  ? "Short Break"
                  : "Long Break"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex justify-center space-x-4 relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTimer}
          className={`px-6 py-2.5 rounded-lg font-medium shadow-sm ${
            isActive
              ? "bg-yellow-100 text-yellow-600 border border-yellow-200"
              : `${modeColor.light} ${modeColor.text} border border-${
                  mode === "work"
                    ? "red"
                    : mode === "shortBreak"
                    ? "green"
                    : "blue"
                }-200`
          }`}
        >
          <div className="flex items-center">
            {isActive ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Start
              </>
            )}
          </div>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetTimer}
          className="px-6 py-2.5 rounded-lg font-medium bg-gray-100 text-gray-700 border border-gray-200 shadow-sm flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Reset
        </motion.button>
      </div>

      {/* Custom time settings button */}
      <div className="flex justify-center mt-4 relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCustomTimeModal(true)}
          className="text-sm text-gray-500 flex items-center hover:text-gray-700 transition-colors"
        >
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
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Custom Time
        </motion.button>
      </div>

      {/* Completion notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute bottom-4 left-0 right-0 mx-auto w-4/5 p-3 rounded-lg ${modeColor.bg} text-white text-center shadow-lg`}
          >
            {mode === "work"
              ? "Work session completed!"
              : "Break time is over!"}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom time settings modal */}
      <AnimatePresence>
        {showCustomTimeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowCustomTimeModal(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Custom Timer Settings
                </h3>
                <button
                  onClick={() => setShowCustomTimeModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Work time slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                      Work Time
                    </label>
                    <span className="text-lg font-semibold text-red-600">
                      {customWorkMinutes} min
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="60"
                    value={customWorkMinutes}
                    onChange={(e) =>
                      setCustomWorkMinutes(parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-red-100 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1 min</span>
                    <span>60 min</span>
                  </div>
                </div>

                {/* Short break slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                      Short Break
                    </label>
                    <span className="text-lg font-semibold text-green-600">
                      {customShortBreakMinutes} min
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={customShortBreakMinutes}
                    onChange={(e) =>
                      setCustomShortBreakMinutes(parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-green-100 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1 min</span>
                    <span>30 min</span>
                  </div>
                </div>

                {/* Long break slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                      Long Break
                    </label>
                    <span className="text-lg font-semibold text-blue-600">
                      {customLongBreakMinutes} min
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="60"
                    value={customLongBreakMinutes}
                    onChange={(e) =>
                      setCustomLongBreakMinutes(parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1 min</span>
                    <span>60 min</span>
                  </div>
                </div>

                {/* Preset buttons */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => {
                      setCustomWorkMinutes(25);
                      setCustomShortBreakMinutes(5);
                      setCustomLongBreakMinutes(15);
                    }}
                    className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700"
                  >
                    Classic (25/5/15)
                  </button>
                  <button
                    onClick={() => {
                      setCustomWorkMinutes(50);
                      setCustomShortBreakMinutes(10);
                      setCustomLongBreakMinutes(30);
                    }}
                    className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700"
                  >
                    Extended (50/10/30)
                  </button>
                  <button
                    onClick={() => {
                      setCustomWorkMinutes(15);
                      setCustomShortBreakMinutes(3);
                      setCustomLongBreakMinutes(9);
                    }}
                    className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700"
                  >
                    Quick (15/3/9)
                  </button>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCustomTimeModal(false)}
                  className="px-4 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={saveCustomTimes}
                  className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Save Settings
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
