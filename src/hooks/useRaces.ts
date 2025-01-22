import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const fetchRaces = async (season: string, page: number, limit: number) => {
  const offset = page * limit;
  const response = await axiosInstance.get(`/${season}/races.json`, {
    params: { limit, offset },
  });
  console.log(response);
  return {
    races: response.data.MRData.RaceTable.Races,
    total: response.data.MRData.total,
  };
};

export const useRaces = (season: string, page: number, limit: number) => {
  return useQuery(
    ["races", season, page],
    () => fetchRaces(season, page, limit),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      enabled: !!season,
    }
  );
};
