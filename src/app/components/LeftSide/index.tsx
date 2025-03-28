import { useState } from "react";
import { motion } from "framer-motion";
import Calculator from "./Calculator";
import Pomodoro from "./Pomodoro";
import Converter from "./Converter";
import Notes from "./Notes";
import Reminders from "./Reminders";

// Define the available tools
type Tool = "calculator" | "pomodoro" | "converter" | "notes" | "reminders";

export default function LeftSide() {
  const [activeTool, setActiveTool] = useState<Tool>("calculator");

  // Tool icons and their corresponding colors
  const tools = [
    {
      id: "calculator",
      name: "Calculator",
      color: "text-indigo-500",
      bgColor: "bg-indigo-100",
    },
    {
      id: "pomodoro",
      name: "Pomodoro",
      color: "text-red-500",
      bgColor: "bg-red-100",
    },
    {
      id: "converter",
      name: "Converter",
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      id: "notes",
      name: "Quick Notes",
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      id: "reminders",
      name: "Reminders",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
  ];

  return (
    <div className="flex flex-col h-full ">
      {/* Top section - Active Tool */}
      <div className="flex-grow bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50 mb-4 overflow-hidden relative">
        <div
          className="absolute top-0 left-0 w-40 h-40 rounded-full -ml-20 -mt-20 blur-2xl"
          style={{
            background:
              "linear-gradient(to bottom right, var(--widget-gradient-1), var(--widget-gradient-2))",
          }}
        ></div>
        <h2 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
          <span
            className={`mr-2 ${tools.find((t) => t.id === activeTool)?.color}`}
          >
            {getToolIcon(activeTool)}
          </span>
          {tools.find((t) => t.id === activeTool)?.name}
        </h2>
        <div className="relative z-10">
          {/* Tool content */}
          {activeTool === "calculator" && <Calculator />}
          {activeTool === "pomodoro" && <Pomodoro />}
          {activeTool === "converter" && <Converter />}
          {activeTool === "notes" && <Notes />}
          {activeTool === "reminders" && <Reminders />}
        </div>
      </div>

      {/* Bottom section - Tool Selection */}
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-white/50">
        <div className="grid grid-cols-3 gap-2">
          {tools.map((tool) => (
            <motion.button
              key={tool.id}
              onClick={() => setActiveTool(tool.id as Tool)}
              className={`p-3 rounded-xl flex flex-col items-center justify-center transition-all ${
                activeTool === tool.id
                  ? `${tool.bgColor} ring-2 ring-offset-2`
                  : "bg-white/70 hover:bg-white/90"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={`${tool.color}`}>
                {getToolIcon(tool.id as Tool)}
              </span>
              <span className="text-xs mt-1 text-gray-700">{tool.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper function to get the appropriate icon for each tool
function getToolIcon(tool: Tool) {
  switch (tool) {
    case "calculator":
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
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      );
    case "pomodoro":
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case "converter":
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
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      );
    case "notes":
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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      );
    case "reminders":
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
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      );
    default:
      return null;
  }
}
