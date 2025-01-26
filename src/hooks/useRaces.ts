import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchRaces, FetchRacesResponse } from "../api/racesApi";

export const useRaces = (season: string, limit: number) => {
  const [searchParams] = useSearchParams();

  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  const offset = (page - 1) * limit;

  return useQuery<FetchRacesResponse>(
    ["races", season, page],
    () => fetchRaces(season, offset, limit),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      enabled: !!season,
    }
  );
};
