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

export const fetchRaceDetails = async (
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
  const Circuit = race?.Circuit || { circuitName: "N/A" };
  const date = race?.date || "N/A";
  const raceName = race?.raceName || "N/A";

  return {
    raceName,
    date,
    Circuit,
    drivers,
  };
};
