import { Outlet, useNavigation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const Layout: React.FC = () => {
  const navigation = useNavigation();

  return (
    <div className="min-h-screen flex flex-col">
      {navigation.state === "loading" && <LoadingSpinner />}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
