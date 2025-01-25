import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export type TRace = {
  raceName: string;
  date: string;
  Circuit: {
    circuitName: string;
  };
  round: string;
  season: string;
  url: string;
};

type FetchRacesResponse = {
  races: TRace[];
  total: number;
};

const fetchRaces = async (
  season: string,
  page: number,
  limit: number
): Promise<FetchRacesResponse> => {
  const offset = page * limit;
  const response = await axiosInstance.get(`/${season}/races.json`, {
    params: { limit, offset },
  });

  return {
    races: response.data.MRData.RaceTable.Races,
    total: parseInt(response.data.MRData.total, 10),
  };
};

export const useRaces = (season: string, page: number, limit: number) => {
  return useQuery<FetchRacesResponse>(
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
