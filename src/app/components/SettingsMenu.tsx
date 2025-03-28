import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundType } from "./Background";
import { ThemeColor } from "../contexts/ThemeContext";

interface SettingsMenuProps {
  onBackgroundChange: (type: BackgroundType) => void;
  onImageChange: (url: string) => void;
  onOpacityChange: (opacity: number) => void;
  onColorChange: (color: ThemeColor) => void;
  currentSettings: {
    type: BackgroundType;
    imageUrl: string;
    opacity: number;
    color: string;
  };
}

export default function SettingsMenu({
  onBackgroundChange,
  onImageChange,
  onOpacityChange,
  onColorChange,
  currentSettings,
}: SettingsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"background" | "theme">(
    "background"
  );
  const menuRef = useRef<HTMLDivElement>(null);

  // Background image options
  const backgroundImages = [
    { name: "Image 1", url: "/1.webp" },
    { name: "Image 2", url: "/2.webp" },
    { name: "Image 3", url: "/3.webp" },
    { name: "Image 4", url: "/4.webp" },
    { name: "Image 5", url: "/5.webp" },
    { name: "Image 6", url: "/6.webp" },
    { name: "Image 7", url: "/7.webp" },
    { name: "Image 8", url: "/8.webp" },
    { name: "Image 9", url: "/9.webp" },
  ];

  // Color theme options
  const colorThemes = [
    { name: "Blue", value: "blue" },
    { name: "Purple", value: "purple" },
    { name: "Green", value: "green" },
    { name: "Orange", value: "orange" },
    { name: "Pink", value: "pink" },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute  top-0  right-0 z-40 p-4 w-fit" ref={menuRef}>
      {/* Settings Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white/90 transition-all"
        style={{
          boxShadow: isOpen
            ? `0 0 0 3px var(--theme-primary-light), 0 4px 6px -1px rgba(0, 0, 0, 0.1)`
            : undefined,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
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
      </motion.button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute top-16 right-0 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 w-80 border border-white/50"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Appearance Settings
            </h3>

            {/* Tabs */}
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("background")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "background"
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Background
              </button>
              <button
                onClick={() => setActiveTab("theme")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "theme"
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Theme
              </button>
            </div>

            {activeTab === "background" && (
              <>
                {/* Background Type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["gradient", "particles", "image", "waves"].map((type) => (
                      <button
                        key={type}
                        onClick={() =>
                          onBackgroundChange(type as BackgroundType)
                        }
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          currentSettings.type === type
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        style={{
                          backgroundColor:
                            currentSettings.type === type
                              ? "var(--theme-primary)"
                              : undefined,
                        }}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Background Image (only show if type is image) */}
                {currentSettings.type === "image" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background Image
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {backgroundImages.map((img) => (
                        <button
                          key={img.url}
                          onClick={() => onImageChange(img.url)}
                          className={`relative h-16 rounded-lg overflow-hidden border-2 ${
                            currentSettings.imageUrl === img.url
                              ? "border-blue-500"
                              : "border-transparent"
                          }`}
                          style={{
                            borderColor:
                              currentSettings.imageUrl === img.url
                                ? "var(--theme-primary)"
                                : "transparent",
                          }}
                        >
                          <img
                            src={img.url}
                            alt={img.name}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Opacity (only show if type is image) */}
                {currentSettings.type === "image" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image Opacity: {currentSettings.opacity}
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={currentSettings.opacity}
                      onChange={(e) =>
                        onOpacityChange(parseFloat(e.target.value))
                      }
                      className="w-full accent-[var(--theme-primary)]"
                    />
                  </div>
                )}
              </>
            )}

            {activeTab === "theme" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Theme
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {colorThemes.map((theme) => (
                    <div
                      key={theme.value}
                      className="flex flex-col items-center gap-2"
                    >
                      <button
                        onClick={() => onColorChange(theme.value as ThemeColor)}
                        className={`w-12 h-12 rounded-full transition-all ${
                          currentSettings.color === theme.value
                            ? "ring-2 ring-offset-2"
                            : "hover:scale-110"
                        }`}
                        style={{
                          background:
                            theme.value === "blue"
                              ? "linear-gradient(to right, #60a5fa, #3b82f6)"
                              : theme.value === "purple"
                              ? "linear-gradient(to right, #a78bfa, #8b5cf6)"
                              : theme.value === "green"
                              ? "linear-gradient(to right, #4ade80, #22c55e)"
                              : theme.value === "orange"
                              ? "linear-gradient(to right, #fb923c, #f97316)"
                              : "linear-gradient(to right, #f472b6, #ec4899)",
                        }}
                      ></button>
                      <span className="text-xs text-gray-600">
                        {theme.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-[var(--widget-gradient-1)] rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Theme Preview
                  </h4>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-[var(--theme-primary)]"></div>
                    <div className="w-8 h-8 rounded-full bg-[var(--theme-secondary)]"></div>
                    <div className="w-8 h-8 rounded-full bg-[var(--theme-accent)]"></div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-gray-200">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2 px-4 text-white rounded-lg transition-colors"
                style={{ backgroundColor: "var(--theme-primary)" }}
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
