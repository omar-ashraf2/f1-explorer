import { Driver } from "../api/raceDetailsApi";

export const transformDriverData = (drivers: Driver[]) => {
  const chartData = drivers
    .map((driver) => {
      const millis = driver?.millis ? parseInt(driver.millis, 10) : null;
      const position = parseInt(driver.position, 10);
      return {
        name: `${driver.givenName} ${driver.familyName}`,
        time: millis,
        status: driver.status || "N/A",
        position,
      };
    })
    .sort((a, b) => a.position - b.position)
    .map((driver, _, arr) => {
      const winnerTime = arr.find((d) => d.time !== null)?.time || 0;
      return {
        ...driver,
        gap: driver.time !== null ? (driver.time - winnerTime) / 1000 : null,
      };
    });

  return chartData;
};
