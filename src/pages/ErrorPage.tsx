import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error = useRouteError() as {
    status?: number;
    statusText?: string;
    message?: string;
  };
  const status = error?.status || "Error";
  const message =
    error?.statusText || error?.message || "Something went wrong.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold">{status}</h1>
      <p className="mt-4 text-xl">{message}</p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
