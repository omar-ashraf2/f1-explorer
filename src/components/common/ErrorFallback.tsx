import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../../context/ThemeContext";

interface ErrorFallbackProps {
  statusCode?: number;
  statusText?: string;
  message?: string;
  onRetry?: () => void;
  onNavigateHome?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  statusCode = 500,
  statusText = "Something went wrong.",
  message = "Please try again later.",
  onRetry,
  onNavigateHome,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center text-center ${
        theme === "dark"
          ? "bg-secondary-dark text-secondary-light"
          : "bg-secondary-light text-secondary-dark"
      }`}
    >
      <ExclamationCircleIcon className="h-20 w-20 text-red-500 mb-6 animate-pulse" />

      <h1 className="text-5xl font-bold mb-4">{statusCode}</h1>
      <p className="text-lg mb-6">{statusText}</p>
      {message && <p className="text-lg mb-6">{message}</p>}
      <div className="flex gap-4">
        {onNavigateHome && (
          <button
            className="px-6 py-3 bg-primary-light text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
            onClick={onNavigateHome}
          >
            Home Page
          </button>
        )}
        {onRetry && (
          <button
            className="px-6 py-3 bg-accent-light text-accent-dark rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            onClick={onRetry}
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorFallback;
