import { Outlet, useNavigation } from "react-router-dom";
import Footer from "./common/Footer";
import Navbar from "./common/Navbar";
import LoadingSpinner from "./LoadingSpinner";

const Layout: React.FC = () => {
  const navigation = useNavigation();

  return (
    <div className="flex flex-col min-h-screen">
      {navigation.state === "loading" && <LoadingSpinner />}
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
