import { useState } from "react";
import { useParams } from "react-router-dom";

import RacesCard from "../components/common/RacesCard";
import { LoadingSpinner, Pagination, ViewToggle } from "../components/ui";
import { useRaces } from "../hooks/useRaces";
import ErrorPage from "./ErrorPage";

const RacesPage: React.FC = () => {
  const { season } = useParams<{ season: string }>();
  const [page, setPage] = useState<number>(0);
  const [view, setView] = useState<"list" | "card">("card");
  const limit = 15;

  const { data, isLoading, isError } = useRaces(season || "", page, limit);

  if (isError) {
    return (
      <ErrorPage message="An error occurred while fetching races. Please try again later." />
    );
  }

  const { races = [], total = 0 } = data || {};
  const totalPages = Math.ceil(total / limit);

  if (!isLoading && races.length === 0) {
    return (
      <ErrorPage message="No races data is available for this season. Please check back later." />
    );
  }

  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold mb-6 text-center font-orbitron">
        Races for {season} Season
      </h1>

      <div className="flex justify-between items-center mb-6">
        <ViewToggle currentView={view} onToggle={setView} />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div
          className={`grid gap-6 ${
            view === "list"
              ? "grid-cols-1"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          }`}
        >
          {races.map((race, index) => (
            <RacesCard key={index} race={race} view={view} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RacesPage;
