import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchSeasons, FetchSeasonsResponse } from "../api/seasonsApi";

export const useSeasons = (limit: number) => {
  const [searchParams] = useSearchParams();

  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  const offset = (page - 1) * limit;

  return useQuery<FetchSeasonsResponse>(
    ["seasons", page],
    () => fetchSeasons(offset, limit),
    {
      staleTime: 5 * 60 * 1000,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};
