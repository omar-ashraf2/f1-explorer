import { useQuery } from "@tanstack/react-query";
import { fetchRaces } from "../api/apiEndpoints";

export const useRaces = (season: string) => {
  return useQuery(["races", season], () => fetchRaces(season), {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!season,
  });
};
