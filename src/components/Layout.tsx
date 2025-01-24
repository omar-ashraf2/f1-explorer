import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Breadcrumbs from "./common/Breadcrumb";
import Footer from "./common/Footer";
import Navbar from "./common/Navbar";
import { LoadingSpinner } from "./ui";

const Layout: React.FC = () => {
  const navigation = useNavigation();
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {navigation.state === "loading" && <LoadingSpinner />}
      <Navbar />
      <main
        className={`flex-grow ${
          pathname !== "/" ? "container px-4 mx-auto" : ""
        } `}
      >
        {pathname !== "/" && (
          <div className="mt-4 mb-6">
            <Breadcrumbs />
          </div>
        )}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
