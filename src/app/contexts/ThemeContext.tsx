"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { BackgroundType } from "../components/Background";

export type ThemeColor = "blue" | "purple" | "green" | "orange" | "pink";

interface ThemeContextType {
  themeColor: ThemeColor;
  backgroundType: BackgroundType;
  imageUrl: string;
  imageOpacity: number;
  setThemeColor: (color: ThemeColor) => void;
  setBackgroundType: (type: BackgroundType) => void;
  setImageUrl: (url: string) => void;
  setImageOpacity: (opacity: number) => void;
}

const defaultTheme: ThemeContextType = {
  themeColor: "blue",
  backgroundType: "gradient",
  imageUrl: "/backgrounds/mountains.jpg",
  imageOpacity: 0.7,
  setThemeColor: () => {},
  setBackgroundType: () => {},
  setImageUrl: () => {},
  setImageOpacity: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultTheme);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Try to load saved theme from localStorage
  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    if (typeof window !== "undefined") {
      const savedColor = localStorage.getItem("themeColor");
      return (savedColor as ThemeColor) || "blue";
    }
    return "blue";
  });

  const [backgroundType, setBackgroundType] = useState<BackgroundType>(() => {
    if (typeof window !== "undefined") {
      const savedType = localStorage.getItem("backgroundType");
      return (savedType as BackgroundType) || "gradient";
    }
    return "gradient";
  });

  const [imageUrl, setImageUrl] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("imageUrl") || "/backgrounds/mountains.jpg";
    }
    return "/backgrounds/mountains.jpg";
  });

  const [imageOpacity, setImageOpacity] = useState(() => {
    if (typeof window !== "undefined") {
      return parseFloat(localStorage.getItem("imageOpacity") || "0.7");
    }
    return 0.7;
  });

  // Save theme preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem("themeColor", themeColor);
    localStorage.setItem("backgroundType", backgroundType);
    localStorage.setItem("imageUrl", imageUrl);
    localStorage.setItem("imageOpacity", imageOpacity.toString());
  }, [themeColor, backgroundType, imageUrl, imageOpacity]);

  return (
    <ThemeContext.Provider
      value={{
        themeColor,
        backgroundType,
        imageUrl,
        imageOpacity,
        setThemeColor,
        setBackgroundType,
        setImageUrl,
        setImageOpacity,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
