import ReactECharts from "echarts-for-react";
import { Driver } from "../hooks/useRaceDetails";

interface DriverPerformanceChartProps {
  drivers: Driver[];
}

const DriverPerformanceChart: React.FC<DriverPerformanceChartProps> = ({
  drivers,
}) => {
  const normalizedData = drivers
    .map((driver) => {
      const millis = driver?.millis ? parseInt(driver.millis, 10) : null;
      return {
        name: `${driver.givenName} ${driver.familyName}`,
        time: millis,
        status: driver.status,
        position: parseInt(driver.position, 10),
      };
    })
    .sort((a, b) => a.position - b.position);

  const winnerTime =
    normalizedData.find((driver) => driver.time !== null)?.time || 0;

  const chartData = normalizedData.map((driver) => ({
    ...driver,
    gap: driver.time !== null ? (driver.time - winnerTime) / 1000 : null,
  }));

  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["Time Gap (s)", "Position"],
      textStyle: {
        color: "#333",
        fontSize: 12,
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: chartData.map((driver) => driver.name),
      axisLabel: {
        rotate: 45,
        fontSize: 12,
        color: "#555",
      },
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: [
      {
        type: "value",
        name: "Time Gap (s)",
        axisLabel: {
          fontSize: 12,
          color: "#555",
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "#ccc",
          },
        },
      },
      {
        type: "value",
        name: "Position",
        inverse: false,
        axisLabel: {
          fontSize: 12,
          color: "#555",
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "#ccc",
          },
        },
      },
    ],
    series: [
      {
        name: "Time Gap (s)",
        type: "bar",
        data: chartData.map((driver) =>
          driver.gap !== null ? driver.gap : "-"
        ),
        itemStyle: {
          color: "#8884d8",
        },
        barMaxWidth: "30%",
      },
      {
        name: "Position",
        type: "line",
        yAxisIndex: 1,
        data: chartData.map((driver) => driver.position),
        lineStyle: {
          color: "#ff7300",
          width: 2,
        },
        symbol: "circle",
        symbolSize: 8,
        itemStyle: {
          color: "#ff7300",
        },
      },
      {
        name: "Status",
        type: "bar",
        data: chartData.map((driver) => ({
          value: driver.status,
          itemStyle: {
            color: driver.status === "Finished" ? "#82ca9d" : "#ff4d4d",
          },
        })),
        itemStyle: {
          color: "#82ca9d",
        },
      },
    ],
  };

  return (
    <div className="w-full h-[calc(100vh-200px)] dark:bg-secondary-dark rounded-lg shadow-md p-4">
      <ReactECharts
        option={options}
        style={{ height: "100%", width: "100%" }}
        opts={{ renderer: "canvas" }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
};

export default DriverPerformanceChart;
