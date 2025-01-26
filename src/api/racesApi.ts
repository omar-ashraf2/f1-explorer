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

export type FetchRacesResponse = {
  races: TRace[];
  total: number;
};

export const fetchRaces = async (
  season: string,
  offset: number,
  limit: number
): Promise<FetchRacesResponse> => {
  const response = await axiosInstance.get(`/${season}/races.json`, {
    params: { limit, offset },
  });

  return {
    races: response.data.MRData.RaceTable.Races,
    total: parseInt(response.data.MRData.total, 10),
  };
};
