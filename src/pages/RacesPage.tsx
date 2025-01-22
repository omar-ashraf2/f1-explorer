import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Key, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useRaces } from "../hooks/useRaces";
import ErrorPage from "./ErrorPage";
import RacesCard from "../components/common/RacesCard";

const RacesPage: React.FC = () => {
  const { season } = useParams<{ season: string }>();
  const [page, setPage] = useState<number>(0);
  const [view, setView] = useState<"list" | "card">("card");
  const limit = 10;

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center font-orbitron">
        Races for {season} Season
      </h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded ${
              view === "list"
                ? "bg-primary-light text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            <ListBulletIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => setView("card")}
            className={`p-2 rounded ${
              view === "card"
                ? "bg-primary-light text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            <Squares2X2Icon className="h-6 w-6" />
          </button>
        </div>

        <div className="flex items-center space-x-4 font-orbitron">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={page + 1 === totalPages}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
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
          {races.map(
            (
              race: {
                raceName: string;
                date: string;
                Circuit: { circuitName: string };
              },
              index: Key | null | undefined
            ) => (
              <RacesCard key={index} race={race} view={view} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default RacesPage;
