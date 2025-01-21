import { useQuery } from "@tanstack/react-query";
import { fetchRaceDetails } from "../api/apiEndpoints";

export const useRaceDetails = (season: string, round: string) => {
  return useQuery(
    ["raceDetails", season, round],
    () => fetchRaceDetails(season, round),
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      enabled: !!season && !!round,
    }
  );
};
