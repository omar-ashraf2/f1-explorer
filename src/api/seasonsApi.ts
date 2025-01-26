import axiosInstance from "../api/axiosInstance";

export type FetchSeasonsResponse = {
  seasons: { season: string; url: string }[];
  total: number;
};

export const fetchSeasons = async (
  offset: number,
  limit: number
): Promise<FetchSeasonsResponse> => {
  const response = await axiosInstance.get(`/seasons.json`, {
    params: { limit, offset },
  });

  return {
    seasons: response.data.MRData.SeasonTable.Seasons,
    total: parseInt(response.data.MRData.total, 10),
  };
};
