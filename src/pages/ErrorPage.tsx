import { useRouteError } from "react-router-dom";
import { ErrorFallback } from "../components";
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
  const statusCode = routeError?.status || 500;
  const statusText = routeError?.statusText || "Something went wrong.";
  const message =
    customMessage ||
    routeError?.message ||
    "An unexpected error occurred. Please try again.";

  const handleNavigateHome = () => (window.location.href = "/");
  const handleRetry = () => window.location.reload();

  return (
    <ErrorFallback
      statusCode={statusCode}
      statusText={statusText}
      message={message}
      onRetry={handleRetry}
      onNavigateHome={handleNavigateHome}
    />
  );
};

export default ErrorPage;
