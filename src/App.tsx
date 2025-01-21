import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import SeasonsPage from "./pages/SeasonsPage";
import RacesPage from "./pages/RacesPage";
import RaceDetailsPage from "./pages/RaceDetailsPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/seasons", element: <SeasonsPage /> },
      { path: "/seasons/:season/races", element: <RacesPage /> },
      { path: "/seasons/:season/races/:round", element: <RaceDetailsPage /> },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
