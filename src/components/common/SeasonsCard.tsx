import { ArrowRightIcon, LinkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

type SeasonsCardProps = {
  season: string;
  view: "list" | "card";
  wikiUrl: string;
};

const SeasonsCard: React.FC<SeasonsCardProps> = ({ season, view, wikiUrl }) => {
  const isCardView = view === "card";

  return (
    <div
      className={`relative w-full flex flex-col items-center justify-center mx-auto bg-secondary-dark text-text-light rounded-2xl p-4 transition-shadow shadow-md hover:shadow-xl group border-2 border-primary-dark overflow-hidden animate-fade-in ${
        isCardView ? "h-60" : "h-30"
      }`}
    >
      <h2 className="text-6xl font-black tracking-wide text-primary-light dark:text-primary-dark transition-transform group-hover:scale-110 font-orbitron">
        {season}
      </h2>

      <div
        className={`absolute ${
          isCardView ? "bottom-4" : "bottom-1/2 translate-y-1/2"
        } flex w-full justify-between items-center px-7`}
      >
        {wikiUrl && (
          <a
            href={wikiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="season-link"
            title={`View season ${season} on Wikipedia`}
          >
            <LinkIcon className="w-5 h-5 text-text-dark" />
          </a>
        )}
        <Link
          to={`/seasons/${season}/races`}
          className="season-link"
          title="Go to Season Races"
        >
          <ArrowRightIcon className="w-5 h-5 text-text-dark" />
        </Link>
      </div>
    </div>
  );
};

export default SeasonsCard;
