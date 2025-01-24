import { useState } from "react";
import SeasonsCard from "../components/common/SeasonsCard";

import { LoadingSpinner, Pagination, ViewToggle } from "../components/ui";
import { useSeasons } from "../hooks/useSeasons";
import ErrorPage from "./ErrorPage";

type Season = {
  season: string;
  url: string;
};

const SeasonsPage: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [view, setView] = useState<"list" | "card">("card");
  const limit = 15;

  const { data, isLoading, isError } = useSeasons(page, limit);

  if (isError) {
    return (
      <ErrorPage message="An error occurred while fetching seasons. Please try again later." />
    );
  }

  const { seasons = [], total = 0 } = data || {};
  const totalPages = Math.ceil(total / limit);

  if (!isLoading && seasons.length === 0) {
    return (
      <ErrorPage message="No seasons data is available at the moment. Please check back later." />
    );
  }

  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold mb-6 text-center font-orbitron">
        Formula One Seasons
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
          {seasons.map((season: Season) => (
            <SeasonsCard
              key={season.season}
              season={season.season}
              view={view}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SeasonsPage;
