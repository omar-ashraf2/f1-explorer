import { useTheme } from "../context/ThemeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle between light and dark mode"
      aria-pressed={theme === "dark"}
      className="bg-gray-200 dark:bg-background-dark text-gray-800 dark:text-gray-200 p-2 rounded-full shadow-md hover:scale-105 transition-transform"
    >
      {theme === "light" ? (
        <MoonIcon className="h-6 w-6" />
      ) : (
        <SunIcon className="h-6 w-6" />
      )}
    </button>
  );
};

export default ThemeToggle;
