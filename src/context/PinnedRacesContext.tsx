import { createContext, useContext, useEffect, useState } from "react";

interface PinnedRacesContextProps {
  pinnedRaces: Record<string, string[]>;
  addPinnedRace: (season: string, raceId: string) => void;
  removePinnedRace: (season: string, raceId: string) => void;
  clearPinnedRaces: (season: string) => void;
}

const PinnedRacesContext = createContext<PinnedRacesContextProps | undefined>(
  undefined
);

export const PinnedRacesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pinnedRaces, setPinnedRaces] = useState<Record<string, string[]>>(
    () => {
      try {
        const data = JSON.parse(localStorage.getItem("pinnedRaces") || "{}");
        return data || {};
      } catch {
        return {};
      }
    }
  );

  useEffect(() => {
    localStorage.setItem("pinnedRaces", JSON.stringify(pinnedRaces));
  }, [pinnedRaces]);

  const addPinnedRace = (season: string, raceId: string) => {
    setPinnedRaces((prev) => ({
      ...prev,
      [season]: [...(prev[season] || []), raceId].filter(
        (id, index, self) => self.indexOf(id) === index
      ),
    }));
  };

  const removePinnedRace = (season: string, raceId: string) => {
    setPinnedRaces((prev) => ({
      ...prev,
      [season]: (prev[season] || []).filter((id) => id !== raceId),
    }));
  };

  const clearPinnedRaces = (season: string) => {
    setPinnedRaces((prev) => ({
      ...prev,
      [season]: [],
    }));
  };

  return (
    <PinnedRacesContext.Provider
      value={{
        pinnedRaces,
        addPinnedRace,
        removePinnedRace,
        clearPinnedRaces,
      }}
    >
      {children}
    </PinnedRacesContext.Provider>
  );
};

export const usePinnedRaces = () => {
  const context = useContext(PinnedRacesContext);
  if (!context) {
    throw new Error("usePinnedRaces must be used within a PinnedRacesProvider");
  }
  return context;
};
