import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
interface NavbarProps {
  isHome: boolean;
}
const Navbar: React.FC<NavbarProps> = ({ isHome }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <nav
      className={`${
        isHome ? "fixed left-0" : "sticky"
      } top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-background-dark shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
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
