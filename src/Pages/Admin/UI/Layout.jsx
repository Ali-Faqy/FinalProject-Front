import { useState, useEffect } from "react";

import Sidebar from "./sidebar";
import Header from "./header";

export default function Layout({ children, adminName }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentColorTheme, setCurrentColorTheme] = useState("green");

  const colorThemes = {
    green: {
      primary: "bg-gradient-to-r from-green-500 to-emerald-400",
      secondary: "bg-green-100",
      accent: "text-green-600",
      highlight: "bg-green-500",
      border: "border-green-200",
      hover: "hover:bg-green-50",
      button:
        "bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600",
      shadow: "shadow-green-200/50",
      chart: "bg-green-500",
    },
    blue: {
      primary: "bg-gradient-to-r from-blue-500 to-cyan-400",
      secondary: "bg-blue-100",
      accent: "text-blue-600",
      highlight: "bg-blue-500",
      border: "border-blue-200",
      hover: "hover:bg-blue-50",
      button:
        "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600",
      shadow: "shadow-blue-200/50",
      chart: "bg-blue-500",
    },
    purple: {
      primary: "bg-gradient-to-r from-purple-500 to-indigo-400",
      secondary: "bg-purple-100",
      accent: "text-purple-600",
      highlight: "bg-purple-500",
      border: "border-purple-200",
      hover: "hover:bg-purple-50",
      button:
        "bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600",
      shadow: "shadow-purple-200/50",
      chart: "bg-purple-500",
    },
    amber: {
      primary: "bg-gradient-to-r from-amber-500 to-orange-400",
      secondary: "bg-amber-100",
      accent: "text-amber-600",
      highlight: "bg-amber-500",
      border: "border-amber-200",
      hover: "hover:bg-amber-50",
      button:
        "bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600",
      shadow: "shadow-amber-200/50",
      chart: "bg-amber-500",
    },
  };

  useEffect(() => {
    setIsLoaded(true);

    const themeInterval = setInterval(() => {
      const themes = Object.keys(colorThemes);
      const currentIndex = themes.indexOf(currentColorTheme);
      const nextIndex = (currentIndex + 1) % themes.length;
      setCurrentColorTheme(themes[nextIndex]);
    }, 30000);

    return () => clearInterval(themeInterval);
  }, [currentColorTheme]);

  const theme = colorThemes[currentColorTheme];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <Sidebar
        currentColorTheme={currentColorTheme}
        theme={theme}
        isLoaded={isLoaded}
      />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header currentColorTheme={currentColorTheme} theme={theme}  adminName={adminName}/>
        {children}
      </div>
    </div>
  );
}
