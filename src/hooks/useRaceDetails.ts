import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export type Driver = {
  status: string;
  driverId: string;
  givenName: string;
  familyName: string;
  nationality: string;
  team: string;
  position: string;
  time?: string;
  millis?: string;
};

export type Circuit = {
  circuitName: string;
};

export type Race = {
  raceName: string;
  date: string;
  Circuit: Circuit;
  Results: Array<{
    Driver: {
      driverId: string;
      givenName: string;
      familyName: string;
      nationality: string;
    };
    Constructor: {
      name: string;
    };
    position: string;
    status: string;
    Time?: {
      time: string;
      millis: string;
    };
  }>;
};

export type RaceDetails = {
  raceName: string;
  date: string;
  Circuit: Circuit;
  drivers: Driver[];
};

const fetchRaceDetails = async (
  season: string,
  round: string
): Promise<RaceDetails> => {
  const response = await axiosInstance.get(`/${season}/${round}/results.json`);
  const race: Race = response.data.MRData.RaceTable.Races[0];

  const drivers: Driver[] =
    race?.Results.map((driverData) => ({
      driverId: driverData.Driver.driverId,
      givenName: driverData.Driver.givenName,
      familyName: driverData.Driver.familyName,
      nationality: driverData.Driver.nationality,
      team: driverData.Constructor.name,
      position: driverData.position,
      time: driverData.Time?.time || "DNF",
      millis: driverData.Time?.millis || "DNF",
      status: driverData.status,
    })) || [];

  return {
    raceName: race?.raceName || "N/A",
    date: race?.date || "N/A",
    Circuit: race?.Circuit || { circuitName: "N/A" },
    drivers,
  };
};

export const useRaceDetails = (season: string, round: string) => {
  return useQuery(
    ["raceDetails", season, round],
    () => fetchRaceDetails(season, round),
    {
      enabled: !!season && !!round,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
};
