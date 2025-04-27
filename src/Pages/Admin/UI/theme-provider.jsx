import { createContext, useContext, useState } from "react";

const defaultTheme = {
  button: "bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600",
  accent: "text-green-600",
};

const ThemeContext = createContext({
  theme: defaultTheme,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context.theme;
};
