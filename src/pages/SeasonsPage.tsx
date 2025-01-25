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

  const { data, isLoading, isFetching, isError } = useSeasons(page, limit);

  const { seasons = [], total = 0 } = data || {};
  const totalPages = Math.ceil(total / limit);

  if (isError || (!isLoading && seasons.length === 0)) {
    return (
      <ErrorPage message="An error occurred while fetching seasons. Please try again later." />
    );
  }

  return (
    <div className="py-4">
      <h1 className="text-4xl font-bold mb-6 text-center font-orbitron text-primary-light dark:text-primary-dark">
        Formula One Seasons
      </h1>

      <div className="flex justify-between items-center mb-6">
        <ViewToggle currentView={view} onToggle={setView} />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          isLoading={isLoading || isFetching}
        />
      </div>

      {isLoading || isFetching ? (
        <LoadingSpinner />
      ) : (
        <div
          className={`grid gap-4 ${
            view === "list" ? "grid-cols-1" : "card-grid-seasons"
          }`}
        >
          {seasons.map((season: Season) => (
            <SeasonsCard
              key={season.season}
              season={season.season}
              wikiUrl={season.url}
              view={view}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SeasonsPage;
