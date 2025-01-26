import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  LoadingSpinner,
  Pagination,
  RacesCard,
  ViewToggle,
} from "../components";
import { usePinnedRaces } from "../context/PinnedRacesContext";
import { usePagination } from "../hooks/usePagination";
import { useRaces } from "../hooks/useRaces";
import ErrorPage from "./ErrorPage";

const RacesPage: React.FC = () => {
  const { season } = useParams<{ season: string }>();
  const [view, setView] = useState<"list" | "card">("card");
  const limit = 12;

  const { data, isLoading, isFetching, isError } = useRaces(
    season || "",
    limit
  );

  const { races = [], total = 0 } = data || {};

  const { page, totalPages, setPage } = usePagination({
    total,
    limit,
  });
  const { pinnedRaces, addPinnedRace, removePinnedRace, clearPinnedRaces } =
    usePinnedRaces();

  const [visiblePinnedRaces, setVisiblePinnedRaces] = useState<string[]>([]);

  useEffect(() => {
    const seasonPinnedRaces = pinnedRaces[season || ""] || [];
    setVisiblePinnedRaces(seasonPinnedRaces);
  }, [pinnedRaces, season]);

  if (isError || (!isLoading && races.length === 0)) {
    return (
      <ErrorPage customMessage="An error occurred while fetching races. Please try again later." />
    );
  }

  const pinnedRacesData = races.filter((race) =>
    visiblePinnedRaces.includes(race.round)
  );
  const otherRacesData = races.filter(
    (race) => !visiblePinnedRaces.includes(race.round)
  );

  const handleAddToPinned = (raceId: string) => {
    addPinnedRace(season || "", raceId);

    setTimeout(() => {
      setVisiblePinnedRaces((prev) => [...prev, raceId]);
    }, 300);
  };

  const handleRemoveFromPinned = (raceId: string) => {
    setVisiblePinnedRaces((prev) => prev.filter((id) => id !== raceId));

    setTimeout(() => {
      removePinnedRace(season || "", raceId);
    }, 300);
  };

  return (
    <div className="py-4">
      <h1 className="text-4xl font-bold mb-6 text-center font-orbitron text-primary-light dark:text-primary-dark">
        Races for {season} Season
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

      {pinnedRacesData.length > 0 && (
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Favorite Races</h2>
          <button
            title="Clear All Pinned Races For This Season"
            onClick={() => {
              clearPinnedRaces(season || "");
              setVisiblePinnedRaces([]);
            }}
            className="bg-primary-light dark:bg-primary-dark text-white px-4 py-2 rounded-md hover:bg-primary-dark dark:hover:bg-primary-light transition-colors"
          >
            Clear All Pinned
          </button>
        </div>
      )}

      {isLoading || isFetching ? (
        <LoadingSpinner />
      ) : (
        <>
          {pinnedRacesData.length > 0 && (
            <div className="mb-4">
              <div
                className={`grid gap-4 ${
                  view === "list"
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {pinnedRacesData.map((race) => (
                  <RacesCard
                    key={race.round}
                    race={race}
                    view={view}
                    onPinToggle={handleRemoveFromPinned}
                    isPinned
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold mb-4">All Races</h2>
            <div
              className={`grid gap-4 ${
                view === "list"
                  ? "grid-cols-1"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }`}
            >
              {otherRacesData.map((race) => (
                <RacesCard
                  key={race.round}
                  race={race}
                  view={view}
                  onPinToggle={handleAddToPinned}
                  isPinned={false}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RacesPage;
