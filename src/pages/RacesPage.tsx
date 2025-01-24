import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import RacesCard from "../components/common/RacesCard";
import { LoadingSpinner, Pagination, ViewToggle } from "../components/ui";
import { usePinnedRaces } from "../context/PinnedRacesContext";
import { useRaces } from "../hooks/useRaces";
import ErrorPage from "./ErrorPage";

const RacesPage: React.FC = () => {
  const { season } = useParams<{ season: string }>();
  const [page, setPage] = useState<number>(0);
  const [view, setView] = useState<"list" | "card">("card");
  const limit = 15;

  const { data, isLoading, isError } = useRaces(season || "", page, limit);
  const { pinnedRaces, addPinnedRace, removePinnedRace, clearPinnedRaces } =
    usePinnedRaces();

  const [visiblePinnedRaces, setVisiblePinnedRaces] = useState<string[]>([]);

  const { races = [], total = 0 } = data || {};
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    const seasonPinnedRaces = pinnedRaces[season || ""] || [];
    setVisiblePinnedRaces(seasonPinnedRaces);
  }, [pinnedRaces, season]);

  if (!isLoading && races.length === 0) {
    return (
      <ErrorPage message="No races data is available for this season. Please check back later." />
    );
  }

  if (isError) {
    return (
      <ErrorPage message="An error occurred while fetching races. Please try again later." />
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

      {pinnedRacesData.length > 0 && (
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Pinned Races</h2>
          <button
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

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {pinnedRacesData.length > 0 && (
            <div className="mb-4">
              <div
                className={`grid gap-6 ${
                  view === "list"
                    ? "grid-cols-1"
                    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
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
            <h2 className="text-xl font-bold mb-4">All Races</h2>
            <div
              className={`grid gap-6 ${
                view === "list"
                  ? "grid-cols-1"
                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
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
