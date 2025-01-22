import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

type FetchSeasonsResponse = {
  seasons: { season: string; url: string }[];
  total: number;
};

const fetchSeasons = async (
  page: number,
  limit: number
): Promise<FetchSeasonsResponse> => {
  const offset = page * limit;
  const response = await axiosInstance.get(`/seasons.json`, {
    params: { limit, offset },
  });

  return {
    seasons: response.data.MRData.SeasonTable.Seasons,
    total: parseInt(response.data.MRData.total, 10),
  };
};

export const useSeasons = (page: number, limit: number) => {
  return useQuery(["seasons", page], () => fetchSeasons(page, limit), {
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
