import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dateFormatter";

type RacesCardProps = {
  race: {
    raceName: string;
    date: string;
    Circuit: {
      circuitName: string;
    };
  };
  view: "list" | "card";
};

const RacesCard: React.FC<RacesCardProps> = ({ race, view }) => {
  return (
    <div
      className={`bg-[#0C141F] dark:bg-[#0b0b0a] text-white rounded-xl p-4 transition-shadow shadow-md hover:shadow-lg group ${
        view === "card" ? "border-r-2 border-b-2 border-primary-dark" : ""
      }`}
    >
      <h2 className="text-2xl font-bold group-hover:text-primary-light transition-colors">
        {race.raceName}
      </h2>
      <p className="text-sm text-gray-400 dark:text-gray-600">
        {race.Circuit.circuitName}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {formatDate(race.date)}
      </p>
      <Link
        to={`/races/${race.raceName}`}
        className="text-primary-light hover:text-primary-dark mt-4 inline-block"
      >
        View Details →
      </Link>
    </div>
  );
};

export default RacesCard;
