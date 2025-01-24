import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-100 dark:bg-gray-800 text-text-light dark:text-text-dark shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-primary-light dark:text-primary-dark font-orbitron"
        >
          F1 Explorer
        </Link>

        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
