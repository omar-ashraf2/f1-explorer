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
      <ErrorPage customMessage="An error occurred while fetching race details. Please try again later." />
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const { raceName, date, Circuit, drivers } = data || {};

  return (
    <div className="py-4">
      <div className="bg-gradient-to-r from-secondary-dark to-muted-light rounded-lg p-6 mb-8 shadow-lg flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-primary-light dark:text-primary-dark font-orbitron">
            {raceName}
          </h1>
          <p className="text-lg text-muted-dark mb-1">
            {formatDate(date || "")} | {Circuit.circuitName}
          </p>
          <p className="text-sm text-muted-light dark:text-muted-dark">
            Round: {round}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-primary-light dark:text-primary-dark">
          Participating Drivers
        </h2>
        <div className="overflow-x-auto rounded-lg shadow-md border border-accent-light dark:border-accent-dark">
          <table className="w-full table-auto text-left">
            <thead className="bg-gradient-to-r from-primary-light to-primary-dark text-white">
              <tr>
                {["Position", "Driver", "Team", "Nationality", "Time(s)"].map(
                  (header, index) => (
                    <th
                      key={index}
                      className="p-4 font-orbitron text-xs sm:text-sm uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {drivers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-muted-light">
                    No drivers available for this race.
                  </td>
                </tr>
              ) : (
                drivers.map((driver, index) => (
                  <tr
                    key={`${driver.driverId}-${index}`}
                    className={`${
                      index % 2 === 0
                        ? "bg-accent-light dark:bg-accent-dark"
                        : ""
                    } hover:bg-secondary-light dark:hover:bg-secondary-dark`}
                  >
                    <td className="p-3 text-xs sm:text-sm font-bold">
                      {driver.position}
                    </td>
                    <td className="p-3 text-xs sm:text-sm font-semibold">
                      {`${driver.givenName} ${driver.familyName}`}
                    </td>
                    <td className="p-3 text-xs sm:text-sm">{driver.team}</td>
                    <td className="p-3 text-xs sm:text-sm">
                      {driver.nationality}
                    </td>
                    <td
                      className={`p-3 text-xs sm:text-sm font-semibold ${
                        driver.status !== "Finished"
                          ? "text-primary-dark"
                          : "text-success"
                      }`}
                    >
                      {driver.time}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="overflow-x-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-primary-light dark:text-primary-dark">
          Driver Performances Chart
        </h2>
        <DriverPerformanceChart drivers={drivers} />
      </div>
    </div>
  );
};

export default RaceDetailsPage;
