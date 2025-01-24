import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { TRace } from "../../hooks/useRaces";
import { formatDate } from "../../utils/dateFormatter";

type RacesCardProps = {
  race: TRace;
  view: "list" | "card";
  onPinToggle: (raceId: string) => void;
  isPinned: boolean;
};

const RacesCard: React.FC<RacesCardProps> = ({
  race,
  view,
  onPinToggle,
  isPinned,
}) => {
  return (
    <div
      className={`bg-[#0C141F] dark:bg-[#0b0b0a] text-white rounded-xl p-4 transition-shadow shadow-md hover:shadow-lg group animate-fade-in ${
        view === "card" ? "border-r-2 border-b-2 border-primary-dark" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold group-hover:text-primary-light transition-colors">
          {race.raceName}
        </h2>
        <button
          onClick={() => onPinToggle(race.round)}
          className="p-2 rounded-md transition-transform transform hover:scale-110 focus:outline-none"
        >
          {isPinned ? (
            <SolidHeartIcon className="w-6 h-6 text-red-500" />
          ) : (
            <OutlineHeartIcon className="w-6 h-6 text-text-dark hover:text-primary-light" />
          )}
        </button>
      </div>
      <p className="text-sm text-gray-400 dark:text-gray-600">
        {race.Circuit.circuitName}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {formatDate(race.date)}
      </p>
      <Link
        to={`/seasons/${race.season}/races/${race.round}`}
        className="text-primary-light hover:text-primary-dark mt-4 inline-block"
      >
        View Details →
      </Link>
    </div>
  );
};

export default RacesCard;
