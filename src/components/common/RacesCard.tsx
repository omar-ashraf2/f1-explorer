import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import {
  ArrowRightIcon,
  LinkIcon,
  HeartIcon as SolidHeartIcon,
} from "@heroicons/react/24/solid";
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
  const { raceName, Circuit, date, season, round, url: wikiUrl } = race;
  const isCardView = view === "card";

  return (
    <div
      className={`relative bg-secondary-dark text-text-light dark:text-text-dark rounded-2xl transition-shadow shadow-md hover:shadow-lg group animate-fade-in ${
        isCardView
          ? "border-r-2 border-b-2 border-primary-light dark:border-primary-dark"
          : ""
      } ${isCardView ? "h-52" : "h-40"}`}
    >
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl text-white font-bold font-orbitron group-hover:text-primary-dark transition-colors">
          {raceName}
        </h2>
        <button
          onClick={() => onPinToggle(round)}
          className="p-2 rounded-md transition-transform transform hover:scale-110 focus:outline-none"
          aria-label={isPinned ? "Unpin race" : "Pin race"}
        >
          {isPinned ? (
            <SolidHeartIcon className="w-6 h-6 text-primary-light dark:text-primary-dark" />
          ) : (
            <OutlineHeartIcon className="w-6 h-6 text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark" />
          )}
        </button>
      </div>

      <div className="px-4">
        <p className="text-muted-dark mb-1">
          {Circuit.circuitName}
        </p>
        <p className="text-muted-light">
          {formatDate(date)}
        </p>
      </div>

      <div
        className={`absolute bottom-4 w-full flex ${
          isCardView ? "justify-between px-4" : "justify-end right-4 space-x-3"
        } items-center`}
      >
        {wikiUrl && (
          <a
            href={wikiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="season-link"
            title={`View ${raceName} on Wikipedia`}
          >
            <LinkIcon className="w-5 h-5 text-text-dark" />
          </a>
        )}

        <Link
          to={`/seasons/${season}/races/${round}`}
          className="bg-primary-light dark:bg-primary-dark px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-primary-dark dark:hover:bg-primary-dark hover:scale-110 transition-all duration-300"
        >
          <span className="text-white text-xs font-semibold">View Details</span>
          <ArrowRightIcon className="w-4 h-4 text-text-dark" />
        </Link>
      </div>
    </div>
  );
};

export default RacesCard;
