import { useParams } from "react-router-dom";
import DriverPerformanceChart from "../components/DriverPerformanceChart";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useRaceDetails } from "../hooks/useRaceDetails";
import { formatDate } from "../utils/dateFormatter";
import ErrorPage from "./ErrorPage";

const RaceDetailsPage: React.FC = () => {
  const { season, round } = useParams<{ season: string; round: string }>();
  const { data, isLoading, isError } = useRaceDetails(
    season || "",
    round || ""
  );

  if (isError) {
    return (
      <ErrorPage message="An error occurred while fetching race details. Please try again later." />
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const { raceName, date, Circuit, drivers } = data || {};

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg p-6 mb-8 shadow-lg flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">{raceName}</h1>
          <p className="text-lg text-gray-300 mb-1">
            Circuit: {Circuit.circuitName}
          </p>
          <p className="text-sm text-gray-400">
            Round: {round} | Date: {formatDate(date || "")}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Participating Drivers</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left border-collapse border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-3 border-b">Position</th>
                <th className="p-3 border-b">Driver</th>
                <th className="p-3 border-b">Team</th>
                <th className="p-3 border-b">Nationality</th>
                <th className="p-3 border-b">Time</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver, index) => (
                <tr
                  key={`${driver.driverId}-${index}`}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : ""
                  } hover:bg-gray-200 dark:hover:bg-gray-700`}
                >
                  <td className="p-3 border-b font-bold">{driver.position}</td>
                  <td className="p-3 border-b font-semibold">
                    {`${driver.givenName} ${driver.familyName}`}
                  </td>
                  <td className="p-3 border-b">{driver.team}</td>
                  <td className="p-3 border-b">{driver.nationality}</td>
                  <td className="p-3 border-b">{driver.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DriverPerformanceChart drivers={drivers} />
    </div>
  );
};

export default RaceDetailsPage;
