import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Driver } from "../../../api/raceDetailsApi";

interface DriverTableProps {
  drivers: Driver[];
  highlightedDriver: string;
  onHighlight: (value: string) => void;
}

const DriverTable: React.FC<DriverTableProps> = ({
  drivers,
  highlightedDriver,
  onHighlight,
}) => {
  return (
    <>
      <div className="mb-6 relative">
        <MagnifyingGlassIcon className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-light dark:text-primary-dark" />
        <input
          type="text"
          placeholder="Highlight a driver..."
          value={highlightedDriver}
          onChange={(e) => onHighlight(e.target.value)}
          className="w-full pl-12 p-2 border rounded-md shadow-sm focus:outline-none text-text-light"
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md border border-accent-light dark:border-accent-dark">
        <table className="w-full table-auto text-left">
          <thead className="bg-gradient-to-r from-primary-light to-primary-dark text-white">
            <tr>
              {["Position", "Driver", "Team", "Nationality", "Time(s)"].map(
                (header, index) => (
                  <th
                    key={index}
                    className="p-4 font-orbitron text-xs sm:text-sm uppercase tracking-wider"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {drivers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-6 text-muted-light">
                  No drivers available for this race.
                </td>
              </tr>
            ) : (
              drivers.map((driver, index) => (
                <tr
                  key={`${driver.driverId}-${index}`}
                  className={`${
                    highlightedDriver &&
                    `${driver.givenName} ${driver.familyName}`
                      .toLowerCase()
                      .includes(highlightedDriver.toLowerCase())
                      ? "bg-yellow-200 dark:bg-yellow-700"
                      : index % 2 === 0
                      ? "bg-accent-light dark:bg-accent-dark"
                      : ""
                  } hover:bg-secondary-light dark:hover:bg-muted-light transition-colors`}
                >
                  <td className="p-3 text-xs sm:text-sm font-bold">
                    {driver.position}
                  </td>
                  <td className="p-3 text-xs sm:text-sm font-semibold">
                    {`${driver.givenName} ${driver.familyName}`}
                  </td>
                  <td className="p-3 text-xs sm:text-sm">{driver.team}</td>
                  <td className="p-3 text-xs sm:text-sm">
                    {driver.nationality}
                  </td>
                  <td
                    className={`p-3 text-xs sm:text-sm font-semibold ${
                      driver.status !== "Finished"
                        ? "text-primary-dark"
                        : "text-success"
                    }`}
                  >
                    {driver.time}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DriverTable;
