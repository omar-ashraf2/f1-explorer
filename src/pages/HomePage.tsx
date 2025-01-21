import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <header className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-bold mb-4 font-orbitron text-primary-light dark:text-primary-dark">
          Formula One Explorer
        </h1>
        <p className="text-lg mb-8">
          Discover Formula 1 seasons, races, and drivers with ease.
        </p>
        <Link
          to="/seasons"
          className="font-orbitron px-6 py-3 bg-primary-light text-white rounded-lg text-lg font-semibold hover:bg-primary-dark transition-colors"
        >
          Explore Seasons
        </Link>
      </header>
      <section className="w-full py-12 bg-gray-200 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="flex flex-wrap justify-center gap-8 px-4">
          {[
            {
              title: "Explore Seasons",
              description:
                "Browse all Formula 1 seasons in a detailed and organized manner.",
            },
            {
              title: "Race Details",
              description:
                "View comprehensive details about each race, including circuits and dates.",
            },
            {
              title: "Driver Performances",
              description:
                "Analyze driver statistics and visualize race performances.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="w-60 bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
