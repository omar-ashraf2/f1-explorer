import axiosInstance from "./axiosInstance";

export interface RaceDetails {
  raceName: string;
}

export const fetchRaceDetails = async (
  season: string,
  round: string
): Promise<RaceDetails[]> => {
  const response = await axiosInstance.get(`/${season}/${round}/results.json`);
  return response.data.MRData.RaceTable.Races[0];
};
