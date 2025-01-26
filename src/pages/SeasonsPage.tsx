import { useState } from "react";
import {
  LoadingSpinner,
  Pagination,
  SeasonsCard,
  ViewToggle,
} from "../components";
import { usePagination } from "../hooks/usePagination";
import { useSeasons } from "../hooks/useSeasons";
import ErrorPage from "./ErrorPage";

type Season = {
  season: string;
  url: string;
};

const SeasonsPage: React.FC = () => {
  const [view, setView] = useState<"list" | "card">("card");
  const limit = 15;
  const { data, isLoading, isFetching, isError } = useSeasons(limit);
  const { seasons = [], total = 0 } = data || {};

  const { page, totalPages, setPage } = usePagination({
    total,
    limit,
  });

  if (isError || (!isLoading && seasons.length === 0)) {
    return (
      <ErrorPage customMessage="An error occurred while fetching seasons. Please try again later." />
    );
  }

  return (
    <div className="py-4">
      <h1 className="text-4xl font-bold mb-6 text-center font-orbitron text-primary-light dark:text-primary-dark">
        Formula One Seasons
      </h1>

      <div className="flex justify-between items-center max-md:flex-wrap gap-2 mb-6">
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
            view === "list"
              ? "grid-cols-1"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
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
