import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Wellness() {
  const [waterIntake, setWaterIntake] = useState(() => {
    const saved = localStorage.getItem("waterIntake");
    return saved
      ? JSON.parse(saved)
      : { goal: 8, current: 0, lastUpdated: new Date().toDateString() };
  });

  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<
    "inhale" | "hold" | "exhale" | "rest"
  >("inhale");
  const [breathingCount, setBreathingCount] = useState(0);
  const [breathingTimer, setBreathingTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const [meditationTime, setMeditationTime] = useState(5); // minutes
  const [meditationActive, setMeditationActive] = useState(false);
  const [meditationRemaining, setMeditationRemaining] = useState(5 * 60); // seconds
  const [meditationTimer, setMeditationTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  // Reset water intake if it's a new day
  useEffect(() => {
    const today = new Date().toDateString();
    if (waterIntake.lastUpdated !== today) {
      setWaterIntake({ ...waterIntake, current: 0, lastUpdated: today });
    }

    localStorage.setItem("waterIntake", JSON.stringify(waterIntake));
  }, [waterIntake]);

  // Breathing exercise timer
  useEffect(() => {
    if (breathingActive) {
      const phaseDurations = {
        inhale: 4000, // 4 seconds
        hold: 7000, // 7 seconds
        exhale: 8000, // 8 seconds
        rest: 1000, // 1 second
      };

      const timer = setTimeout(() => {
        switch (breathingPhase) {
          case "inhale":
            setBreathingPhase("hold");
            break;
          case "hold":
            setBreathingPhase("exhale");
            break;
          case "exhale":
            setBreathingPhase("rest");
            break;
          case "rest":
            setBreathingPhase("inhale");
            setBreathingCount(breathingCount + 1);
            if (breathingCount >= 4) {
              // Stop after 5 cycles (0-4)
              setBreathingActive(false);
              setBreathingCount(0);
            }
            break;
        }
      }, phaseDurations[breathingPhase]);

      setBreathingTimer(timer);
      return () => clearTimeout(timer);
    }
  }, [breathingActive, breathingPhase, breathingCount]);

  // Meditation timer
  useEffect(() => {
    if (meditationActive && meditationRemaining > 0) {
      const timer = setTimeout(() => {
        setMeditationRemaining(meditationRemaining - 1);
      }, 1000);

      setMeditationTimer(timer);
      return () => clearTimeout(timer);
    } else if (meditationActive && meditationRemaining <= 0) {
      setMeditationActive(false);
      // Play sound or notification here
    }
  }, [meditationActive, meditationRemaining]);

  const addWater = () => {
    if (waterIntake.current < waterIntake.goal) {
      setWaterIntake({ ...waterIntake, current: waterIntake.current + 1 });
    }
  };

  const removeWater = () => {
    if (waterIntake.current > 0) {
      setWaterIntake({ ...waterIntake, current: waterIntake.current - 1 });
    }
  };

  const startBreathing = () => {
    setBreathingActive(true);
    setBreathingPhase("inhale");
    setBreathingCount(0);
  };

  const stopBreathing = () => {
    setBreathingActive(false);
    if (breathingTimer) clearTimeout(breathingTimer);
  };

  const startMeditation = () => {
    setMeditationActive(true);
    setMeditationRemaining(meditationTime * 60);
  };

  const stopMeditation = () => {
    setMeditationActive(false);
    if (meditationTimer) clearTimeout(meditationTimer);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="wellness">
      {/* Water Intake Tracker */}
      <div className="mb-6 bg-white/80 rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Water Intake</h3>
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={removeWater}
            className="p-1.5 rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200 disabled:opacity-50"
            disabled={waterIntake.current <= 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>

          <div className="flex-1 mx-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-teal-500 h-2.5 rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    (waterIntake.current / waterIntake.goal) * 100
                  )}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>0</span>
              <span>
                {waterIntake.current} / {waterIntake.goal} glasses
              </span>
            </div>
          </div>

          <button
            onClick={addWater}
            className="p-1.5 rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200 disabled:opacity-50"
            disabled={waterIntake.current >= waterIntake.goal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Breathing Exercise */}
      <div className="mb-6 bg-white/80 rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Breathing Exercise
        </h3>
        <div className="flex justify-center mb-4">
          <div className="relative">
            <motion.div
              animate={{
                scale:
                  breathingPhase === "inhale"
                    ? 1.5
                    : breathingPhase === "hold"
                    ? 1.5
                    : breathingPhase === "exhale"
                    ? 1
                    : 1,
                opacity: breathingActive ? 1 : 0.5,
              }}
              transition={{ duration: breathingPhase === "exhale" ? 8 : 4 }}
              className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center"
            >
              <span className="text-xs text-teal-700">
                {breathingActive
                  ? breathingPhase === "inhale"
                    ? "Inhale"
                    : breathingPhase === "hold"
                    ? "Hold"
                    : breathingPhase === "exhale"
                    ? "Exhale"
                    : "Rest"
                  : "4-7-8"}
              </span>
            </motion.div>
            {breathingActive && (
              <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-gray-500">
                Cycle {breathingCount + 1}/5
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          {!breathingActive ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startBreathing}
              className="px-4 py-1.5 rounded-lg bg-teal-100 text-teal-600 text-sm font-medium"
            >
              Start Breathing
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={stopBreathing}
              className="px-4 py-1.5 rounded-lg bg-red-100 text-red-600 text-sm font-medium"
            >
              Stop
            </motion.button>
          )}
        </div>
      </div>

      {/* Meditation Timer */}
      <div className="bg-white/80 rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Meditation Timer
        </h3>
        {!meditationActive ? (
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={() => setMeditationTime(Math.max(1, meditationTime - 1))}
              className="p-1.5 rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
            <div className="mx-4 text-center">
              <span className="text-2xl font-medium text-gray-700">
                {meditationTime}
              </span>
              <span className="text-sm text-gray-500 ml-1">min</span>
            </div>
            <button
              onClick={() =>
                setMeditationTime(Math.min(60, meditationTime + 1))
              }
              className="p-1.5 rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="text-center mb-4">
            <span className="text-3xl font-medium text-gray-700">
              {formatTime(meditationRemaining)}
            </span>
          </div>
        )}
        <div className="flex justify-center">
          {!meditationActive ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startMeditation}
              className="px-4 py-1.5 rounded-lg bg-teal-100 text-teal-600 text-sm font-medium"
            >
              Start Meditation
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={stopMeditation}
              className="px-4 py-1.5 rounded-lg bg-red-100 text-red-600 text-sm font-medium"
            >
              Stop
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
