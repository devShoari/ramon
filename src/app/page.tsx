"use client";
import { useTheme } from "./contexts/ThemeContext";
import { useState } from "react";
import QuickLinks from "./components/widgets/QuickLinks";
import Background from "./components/Background";
import SettingsMenu from "./components/SettingsMenu";
import SearchBar from "./components/SearchBar";
import Clock from "./components/Clock";
import Weather from "./components/widgets/Weather";
import TodoList from "./components/widgets/TodoList";
import Notes from "./components/widgets/Notes";
import Calendar from "./components/widgets/Calendar";
import Bookmarks from "./components/Bookmarks";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";

export default function NewTabPage() {
  const {
    themeColor,
    backgroundType,
    imageUrl,
    imageOpacity,
    setThemeColor,
    setBackgroundType,
    setImageUrl,
    setImageOpacity,
  } = useTheme();

  // State for controlling visibility of different sections
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const [showWidgets, setShowWidgets] = useState(true);

  return (
    <div className={`theme-${themeColor}`}>
      {/* Animated background elements */}
      <Background
        type={backgroundType}
        imageUrl={imageUrl}
        opacity={imageOpacity}
        color={themeColor}
      />

      {/* Settings Menu */}

      {/* Main three-part layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left sidebar - STICKY on large screens, horizontal on small screens */}
        {showLeftSidebar && (
          <div className="w-full lg:w-1/5 p-4 z-10 lg:sticky lg:top-0 lg:h-screen overflow-y-auto hide-scrollbar">
            {/* Left sidebar content */}
            <LeftSide />
          </div>
        )}

        {/* Center content - SCROLLABLE */}
        <div
          className={`w-full ${
            !showLeftSidebar && !showRightSidebar
              ? "lg:w-full"
              : !showLeftSidebar || !showRightSidebar
              ? "lg:w-4/5"
              : "lg:w-3/5"
          } p-4 relative z-10 overflow-y-auto hide-scrollbar`}
        >
          {/* Search Bar */}
          {/* Header with layout controls */}
          <SettingsMenu
            onBackgroundChange={setBackgroundType}
            onImageChange={setImageUrl}
            onOpacityChange={setImageOpacity}
            onColorChange={setThemeColor}
            currentSettings={{
              type: backgroundType,
              imageUrl: imageUrl,
              opacity: imageOpacity,
              color: themeColor,
            }}
          />
          <header className="sticky  top-0  right-0 z-40 p-4 w-fit">
            <div className="bg-white/70 backdrop-blur-md rounded-full shadow-lg px-4 py-2 flex items-center space-x-4 border border-white/50">
              {/* Left sidebar toggle */}
              <button
                onClick={() => setShowLeftSidebar(!showLeftSidebar)}
                className={`p-2 rounded-full transition-colors ${
                  showLeftSidebar
                    ? "bg-[var(--theme-primary)] text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
                title={
                  showLeftSidebar ? "Hide left sidebar" : "Show left sidebar"
                }
              >
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
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </button>

              {/* Widgets toggle */}
              <button
                onClick={() => setShowWidgets(!showWidgets)}
                className={`p-2 rounded-full transition-colors ${
                  showWidgets
                    ? "bg-[var(--theme-primary)] text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
                title={showWidgets ? "Hide widgets" : "Show widgets"}
              >
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
              </button>

              {/* Right sidebar toggle */}
              <button
                onClick={() => setShowRightSidebar(!showRightSidebar)}
                className={`p-2 rounded-full transition-colors ${
                  showRightSidebar
                    ? "bg-[var(--theme-primary)] text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
                title={
                  showRightSidebar ? "Hide right sidebar" : "Show right sidebar"
                }
              >
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
                    d="M4 6h16M12 12h8m-8 6h16"
                  />
                </svg>
              </button>
            </div>
          </header>
          <Clock />
          <SearchBar />
          <Bookmarks />

          {/* Widgets Grid */}
          {showWidgets && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mt-8">
              {/* Weather Widget */}
              <Weather />

              {/* To-Do List Widget */}
              <TodoList />

              {/* Sticky Notes Widget */}
              <Notes />
              <QuickLinks />
              {/* Calendar Widget */}
              <Calendar />
            </div>
          )}
        </div>

        {/* Right sidebar - STICKY on large screens, horizontal on small screens */}
        {showRightSidebar && (
          <div className="w-full lg:w-1/5 p-4 relative z-10 lg:sticky lg:top-0 lg:h-screen overflow-y-auto hide-scrollbar">
            {/* Right sidebar content */}
            <RightSide />
          </div>
        )}
      </div>
    </div>
  );
}
