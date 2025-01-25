import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";

const routeLabels: Record<string, string> = {
  "": "Home",
  seasons: "Seasons",
  races: "Races",
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);

  if (paths.length === 0) {
    return null;
  }

  const breadcrumbs = paths.map((path, index) => {
    const currentPath = paths.slice(0, index + 1).join("/");
    const isLast = index === paths.length - 1;

    const isSeasonNumber = paths[index - 1] === "seasons";
    const isRaceNumber = paths[index - 1] === "races";

    const readableLabel =
      routeLabels[path] ||
      (isSeasonNumber
        ? `Season ${path}`
        : isRaceNumber
        ? "Race Results"
        : path);

    return (
      <div key={currentPath} className="flex items-center">
        <ChevronRightIcon className="w-4 h-4 text-muted-light dark:text-muted-dark mx-2" />
        {isLast || isRaceNumber || isSeasonNumber ? (
          <span
            className={`${
              isLast
                ? "text-primary-light dark:text-primary-dark font-semibold"
                : "text-muted-light dark:text-muted-dark"
            }`}
          >
            {readableLabel}
          </span>
        ) : (
          <Link
            to={`/${currentPath}`}
            className="hover:text-primary-light dark:hover:text-primary-dark transition"
          >
            {readableLabel}
          </Link>
        )}
      </div>
    );
  });

  return (
    <nav className="flex items-center text-xs md:text-sm bg-secondary-light dark:bg-secondary-dark px-4 py-2 rounded-lg shadow-sm max-sm:flex-wrap">
      <Link
        to="/"
        className="hover:text-primary-light dark:hover:text-primary-dark transition"
      >
        Home
      </Link>
      {breadcrumbs}
    </nav>
  );
};

export default Breadcrumbs;
