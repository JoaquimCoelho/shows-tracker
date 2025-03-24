"use client";

import { useTheme } from "next-themes";
import React from "react";

export const ColorModeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle dark mode"
    >
      {theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    </button>
  );
};
