import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/ui/Layout";
import {
  ErrorPage,
  HomePage,
  RaceDetailsPage,
  RacesPage,
  SeasonsPage,
} from "./pages";

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
