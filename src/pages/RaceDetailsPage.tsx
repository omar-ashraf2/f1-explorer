import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  DriverPerformanceChart,
  DriverTable,
  LoadingSpinner,
} from "../components";
import { useRaceDetails } from "../hooks/useRaceDetails";
import { formatDate } from "../utils/dateFormatter";
import ErrorPage from "./ErrorPage";

const RaceDetailsPage: React.FC = () => {
  const { season, round } = useParams<{ season: string; round: string }>();
  const [highlightedDriver, setHighlightedDriver] = useState<string>("");
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
        <DriverTable
          drivers={drivers}
          highlightedDriver={highlightedDriver}
          onHighlight={setHighlightedDriver}
        />
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-primary-light dark:text-primary-dark">
          Driver Performances Chart
        </h2>
        <div className="overflow-x-auto">
          <DriverPerformanceChart drivers={drivers} />
        </div>
      </div>
    </div>
  );
};

export default RaceDetailsPage;
