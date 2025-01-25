import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useRouteError } from "react-router-dom";
import { vi, Mock } from "vitest";
import { useTheme } from "../../context/ThemeContext";
import ErrorPage from "../../pages/ErrorPage";

vi.mock("react-router-dom", async () => {
  const actual = await import("react-router-dom");
  return {
    ...actual,
    useRouteError: vi.fn(),
    MemoryRouter: actual.MemoryRouter,
  };
});

vi.mock("../../context/ThemeContext", () => ({
  useTheme: vi.fn(),
}));

describe("ErrorPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders error message and status when route error is passed", () => {
    (useRouteError as Mock).mockReturnValue({
      status: 404,
      statusText: "Page Not Found",
      message: "The page you are looking for does not exist.",
    });

    (useTheme as Mock).mockReturnValue({
      theme: "light",
    });

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();

    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();

    const messageElement = screen.getByText(
      /The page you are looking for does not exist/i
    );
    expect(messageElement).toBeInTheDocument();
  });

  test("renders default error message when no error is passed", () => {
    (useRouteError as Mock).mockReturnValue({});
    (useTheme as Mock).mockReturnValue({
      theme: "light",
    });

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Something went wrong./i)).toBeInTheDocument();
  });

  test("renders correct theme classes for light mode", () => {
    (useRouteError as Mock).mockReturnValue({});
    (useTheme as Mock).mockReturnValue({
      theme: "light",
    });

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    const errorPage = screen.getByRole("heading", { level: 1 }).parentElement;
    expect(errorPage).toHaveClass("bg-gray-100 text-gray-900");
  });

  test("renders correct theme classes for dark mode", () => {
    (useRouteError as Mock).mockReturnValue({});
    (useTheme as Mock).mockReturnValue({
      theme: "dark",
    });

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    const errorPage = screen.getByRole("heading", { level: 1 }).parentElement;
    expect(errorPage).toHaveClass("bg-gray-900 text-gray-100");
  });

  test("Go to Home button navigates to home", () => {
    (useRouteError as Mock).mockReturnValue({});
    (useTheme as Mock).mockReturnValue({
      theme: "light",
    });

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    const homeButton = screen.getByText(/Go to Home/i);
    expect(homeButton).toBeInTheDocument();

    fireEvent.click(homeButton);

    expect(window.location.pathname).toBe("/");
  });

  test("Retry button reloads the page", () => {
    (useRouteError as Mock).mockReturnValue({});
    (useTheme as Mock).mockReturnValue({
      theme: "light",
    });

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    const retryButton = screen.getByText(/Retry/i);
    expect(retryButton).toBeInTheDocument();

    const reloadSpy = vi.fn();
    Object.defineProperty(window, "location", {
      writable: true,
      value: {
        ...window.location,
        reload: reloadSpy,
      },
    });

    fireEvent.click(retryButton);

    expect(reloadSpy).toHaveBeenCalled();
  });

  test("renders ExclamationCircleIcon", () => {
    (useRouteError as Mock).mockReturnValue({});
    (useTheme as Mock).mockReturnValue({
      theme: "light",
    });

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    const icon = document.querySelector("svg");
    expect(icon).toHaveClass("h-20 w-20 text-red-500 mb-6 animate-pulse");
  });
});
