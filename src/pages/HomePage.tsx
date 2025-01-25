import { Link } from "react-router-dom";
import HeroBackground from "../assets/bg_f1.webp";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <header className="relative flex items-center justify-center h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HeroBackground})`,
          }}
        ></div>

        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-primary-dark opacity-40"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 font-orbitron text-primary-light drop-shadow-md">
            Formula One Explorer
          </h1>
          <p className=" md:text-xl max-w-2xl mb-10 font-orbitron font-semibold text-white drop-shadow-lg">
            Dive into the world of Formula 1 <br /> Explore seasons, races, and
            drivers like never before.
          </p>
          <Link
            to="/seasons"
            className="px-8 py-4 bg-primary-dark text-background-light rounded-full text-sm md:text-lg font-semibold hover:bg-primary-dark hover:dark:bg-primary-light transition-colors shadow-lg"
          >
            Explore Seasons
          </Link>
        </div>
      </header>

      <section className="w-full py-12 bg-secondary-light dark:bg-secondary-dark transition-colors">
        <h2 className="text-3xl font-bold text-center mb-8 text-text-light dark:text-text-dark font-orbitron">
          Features
        </h2>
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
              className="w-64 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark p-6 rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-light dark:text-muted-dark">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
