import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import {
  PinnedRacesProvider,
  usePinnedRaces,
} from "../../context/PinnedRacesContext";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

const TestComponent = () => {
  const { pinnedRaces, addPinnedRace, removePinnedRace, clearPinnedRaces } =
    usePinnedRaces();

  return (
    <div>
      <button onClick={() => addPinnedRace("2023", "race1")}>Add Race</button>
      <button onClick={() => removePinnedRace("2023", "race1")}>
        Remove Race
      </button>
      <button onClick={() => clearPinnedRaces("2023")}>Clear Races</button>
      <div data-testid="pinnedRaces">{JSON.stringify(pinnedRaces)}</div>
    </div>
  );
};

describe("PinnedRacesContext", () => {
  afterEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  test("initializes pinnedRaces from localStorage", () => {
    localStorage.setItem("pinnedRaces", JSON.stringify({ "2023": ["race1"] }));

    render(
      <PinnedRacesProvider>
        <TestComponent />
      </PinnedRacesProvider>
    );

    expect(screen.getByTestId("pinnedRaces").textContent).toEqual(
      JSON.stringify({ "2023": ["race1"] })
    );
  });

  test("adds a pinned race", async () => {
    render(
      <PinnedRacesProvider>
        <TestComponent />
      </PinnedRacesProvider>
    );

    await userEvent.click(screen.getByText("Add Race"));

    expect(screen.getByTestId("pinnedRaces").textContent).toEqual(
      JSON.stringify({ "2023": ["race1"] })
    );
    expect(localStorage.getItem("pinnedRaces")).toEqual(
      JSON.stringify({ "2023": ["race1"] })
    );
  });

  test("removes a pinned race", async () => {
    localStorage.setItem("pinnedRaces", JSON.stringify({ "2023": ["race1"] }));

    render(
      <PinnedRacesProvider>
        <TestComponent />
      </PinnedRacesProvider>
    );

    await userEvent.click(screen.getByText("Remove Race"));

    expect(screen.getByTestId("pinnedRaces").textContent).toEqual(
      JSON.stringify({ "2023": [] })
    );
    expect(localStorage.getItem("pinnedRaces")).toEqual(
      JSON.stringify({ "2023": [] })
    );
  });

  test("clears pinned races for a season", async () => {
    localStorage.setItem(
      "pinnedRaces",
      JSON.stringify({ "2023": ["race1", "race2"] })
    );

    render(
      <PinnedRacesProvider>
        <TestComponent />
      </PinnedRacesProvider>
    );

    await userEvent.click(screen.getByText("Clear Races"));

    expect(screen.getByTestId("pinnedRaces").textContent).toEqual(
      JSON.stringify({ "2023": [] })
    );
    expect(localStorage.getItem("pinnedRaces")).toEqual(
      JSON.stringify({ "2023": [] })
    );
  });

  test("prevents duplicate race IDs", async () => {
    render(
      <PinnedRacesProvider>
        <TestComponent />
      </PinnedRacesProvider>
    );

    await userEvent.click(screen.getByText("Add Race"));
    await userEvent.click(screen.getByText("Add Race"));

    expect(screen.getByTestId("pinnedRaces").textContent).toEqual(
      JSON.stringify({ "2023": ["race1"] })
    );
  });
});
