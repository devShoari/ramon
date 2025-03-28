import { useState } from "react";
import { motion } from "framer-motion";
import Entertainment from "./Entertainment";
import Learning from "./Learning";
import Wellness from "./Wellness";
import News from "./News";
import Dashboard from "./Dashboard";

// Define the available panels
type Panel = "entertainment" | "learning" | "wellness" | "news" | "dashboard";

export default function RightSide() {
  const [activePanel, setActivePanel] = useState<Panel>("dashboard");

  // Panel icons and their corresponding colors
  const panels = [
    {
      id: "dashboard",
      name: "Dashboard",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      id: "entertainment",
      name: "Entertainment",
      color: "text-pink-500",
      bgColor: "bg-pink-100",
    },
    {
      id: "learning",
      name: "Learning",
      color: "text-amber-500",
      bgColor: "bg-amber-100",
    },
    {
      id: "wellness",
      name: "Wellness",
      color: "text-teal-500",
      bgColor: "bg-teal-100",
    },
    {
      id: "news",
      name: "News",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Top section - Panel Selection */}
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-white/50 mb-4">
        <div className="grid grid-cols-3 gap-2">
          {panels.map((panel) => (
            <motion.button
              key={panel.id}
              onClick={() => setActivePanel(panel.id as Panel)}
              className={`p-3 rounded-xl flex flex-col items-center justify-center transition-all ${
                activePanel === panel.id
                  ? `${panel.bgColor} ring-2 ring-offset-2`
                  : "bg-white/70 hover:bg-white/90"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={`${panel.color}`}>
                {getPanelIcon(panel.id as Panel)}
              </span>
              <span className="text-xs mt-1 text-gray-700">{panel.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom section - Active Panel */}
      <div className="flex-grow bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50 overflow-hidden relative">
        <div
          className="absolute top-0 right-0 w-40 h-40 rounded-full -mr-20 -mt-20 blur-2xl"
          style={{
            background:
              "linear-gradient(to bottom right, var(--widget-gradient-1), var(--widget-gradient-2))",
          }}
        ></div>

        <h2 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
          <span
            className={`mr-2 ${
              panels.find((p) => p.id === activePanel)?.color
            }`}
          >
            {getPanelIcon(activePanel)}
          </span>
          {panels.find((p) => p.id === activePanel)?.name}
        </h2>

        <div className="relative z-10">
          {/* Panel content */}
          {activePanel === "dashboard" && <Dashboard />}
          {activePanel === "entertainment" && <Entertainment />}
          {activePanel === "learning" && <Learning />}
          {activePanel === "wellness" && <Wellness />}
          {activePanel === "news" && <News />}
        </div>
      </div>
    </div>
  );
}

// Helper function to get the appropriate icon for each panel
function getPanelIcon(panel: Panel) {
  switch (panel) {
    case "dashboard":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      );
    case "entertainment":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
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
      );
    case "learning":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      );
    case "wellness":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      );
    case "news":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      );
    default:
      return null;
  }
}
