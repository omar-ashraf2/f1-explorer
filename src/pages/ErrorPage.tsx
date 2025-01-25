import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useRouteError } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
}

interface ErrorPageProps {
  customMessage?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ customMessage }) => {
  const routeError = useRouteError() as RouteError;
  const { theme } = useTheme();

  const statusCode = routeError?.status || 500;
  const statusText = routeError?.statusText || "Something went wrong.";
  const message =
    customMessage || routeError?.message || "Please try again later.";

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center text-center ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <ExclamationCircleIcon className="h-20 w-20 text-red-500 mb-6 animate-pulse" />

      <h1 className="text-5xl font-bold mb-4">{statusCode}</h1>
      <p className="text-lg mb-6">{statusText}</p>
      {message && <p className="text-lg mb-6">{message}</p>}
      <div className="flex gap-4">
        <a
          href="/"
          className="px-6 py-3 bg-primary-light text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
        >
          Go to Home
        </a>
        <button
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
