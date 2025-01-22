import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Link, useRouteError } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
}

const ErrorPage: React.FC<{ message?: string }> = ({ message }) => {
  const { theme } = useTheme();
  const routeError = useRouteError() as RouteError;
  const status = routeError?.status || "Error";
  const statusMessage =
    message ||
    routeError?.statusText ||
    routeError?.message ||
    "Something went wrong.";

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center text-center ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      } transition-colors px-4`}
    >
      <ExclamationCircleIcon className="h-20 w-20 text-red-500 mb-6 animate-pulse" />
      <h1 className="text-5xl font-bold mb-4">{status}</h1>
      <p className="text-lg mb-6">{statusMessage}</p>
      <div className="flex gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-primary-light text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
        >
          Go to Home
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
