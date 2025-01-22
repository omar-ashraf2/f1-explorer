import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import CardImage from "../../assets/f1Card.jpg";

type SeasonsCardProps = {
  season: string;
  view: "list" | "card";
};

const SeasonsCard: React.FC<SeasonsCardProps> = ({ season, view }) => {
  return (
    <Link
      to={`/seasons/${season}/races`}
      className="relative flex items-center justify-between bg-[#0C141F] dark:bg-[#0b0b0a] text-white rounded-xl p-4 transition-shadow shadow-md hover:shadow-lg group border-r-2 border-b-2 border-primary-dark overflow-hidden"
    >
      <div className="z-10">
        <h2 className="text-2xl font-bold group-hover:text-primary-dark transition-colors">
          {season}
        </h2>
        <p className="text-sm text-gray-400 dark:text-gray-600">
          Explore races
        </p>
      </div>

      <div
        className={`absolute right-0 top-0 h-full ${
          view === "list" ? "sm:w-1/6 w-1/2" : "sm:w-2/5 w-1/2"
        }  bg-cover bg-right opacity-20 group-hover:opacity-30 transition-opacity`}
        style={{
          backgroundImage: `url(${CardImage})`,
        }}
      ></div>

      <div className="flex items-center z-10">
        <ArrowRightIcon className="w-6 h-6 ml-2 text-primary-light group-hover:text-primary-dark transition-colors" />
      </div>
    </Link>
  );
};

export default SeasonsCard;
