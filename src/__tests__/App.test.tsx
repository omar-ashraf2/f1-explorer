import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { vi } from "vitest";

vi.mock("../pages/HomePage", () => ({ default: () => <div>Home Page</div> }));
vi.mock("../pages/SeasonsPage", () => ({
  default: () => <div>Seasons Page</div>,
}));
vi.mock("../pages/RacesPage", () => ({ default: () => <div>Races Page</div> }));
vi.mock("../pages/RaceDetailsPage", () => ({
  default: () => <div>Race Details Page</div>,
}));
vi.mock("../pages/ErrorPage", () => ({ default: () => <div>Error Page</div> }));

describe("App Routing", () => {
  const routes = [
    { path: "/", element: <div>Home Page</div> },
    { path: "/seasons", element: <div>Seasons Page</div> },
    { path: "/seasons/:season/races", element: <div>Races Page</div> },
    {
      path: "/seasons/:season/races/:round",
      element: <div>Race Details Page</div>,
    },
    { path: "*", element: <div>Error Page</div> },
  ];

  test("renders HomePage on default route", () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    render(<RouterProvider router={router} />);

    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });

  test("renders SeasonsPage on '/seasons' route", () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/seasons"] });
    render(<RouterProvider router={router} />);

    expect(screen.getByText(/Seasons Page/i)).toBeInTheDocument();
  });

  test("renders RacesPage on '/seasons/:season/races' route", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/seasons/2023/races"],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByText(/Races Page/i)).toBeInTheDocument();
  });

  test("renders RaceDetailsPage on '/seasons/:season/races/:round' route", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/seasons/2023/races/1"],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByText(/Race Details Page/i)).toBeInTheDocument();
  });

  test("renders ErrorPage on invalid route", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/invalid-route"],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByText(/Error Page/i)).toBeInTheDocument();
  });
});
