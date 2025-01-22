import axiosInstance from "./axiosInstance";

export interface Race {
  raceName: string;
  round: string;
  date: string;
  Circuit: {
    circuitName: string;
  };
}
export interface RaceDetails {
  raceName: string;
}

export const fetchRaces = async (season: string): Promise<Race[]> => {
  const response = await axiosInstance.get(`/${season}/races.json`);
  return response.data.MRData.RaceTable.Races;
};

export const fetchRaceDetails = async (
  season: string,
  round: string
): Promise<RaceDetails[]> => {
  const response = await axiosInstance.get(`/${season}/${round}/results.json`);
  return response.data.MRData.RaceTable.Races[0];
};
