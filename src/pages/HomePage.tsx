import { Link } from "react-router-dom";
import HeroBackground from "../assets/bg_f1.webp";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-black text-text-light dark:text-text-dark  min-h-screen">
      <header className="relative flex items-center justify-center h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HeroBackground})`,
          }}
        ></div>

        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-96 h-96 rounded-full bg-red-600 opacity-40"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 font-orbitron text-red-500 drop-shadow-md">
            Formula One Explorer
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-10 font-light drop-shadow-sm text-white">
            Dive into the world of Formula 1. Explore seasons, races, and
            drivers like never before.
          </p>
          <Link
            to="/seasons"
            className="px-8 py-4 bg-red-500 text-white rounded-full text-lg font-semibold hover:bg-red-700 transition-colors shadow-lg"
          >
            Explore Seasons
          </Link>
        </div>
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
