import { useQuery } from "@tanstack/react-query";
import { fetchSeasons } from "../api/apiEndpoints";

export const useSeasons = () => {
  return useQuery(["seasons"], fetchSeasons, {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
