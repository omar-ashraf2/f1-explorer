import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { Driver } from "../hooks/useRaceDetails";

interface DriverPerformanceChartProps {
  drivers: Driver[];
}

const DriverPerformanceChart: React.FC<DriverPerformanceChartProps> = ({
  drivers,
}) => {
  // Detect and handle theme changes using matchMedia
  const [theme, setTheme] = useState<"lightTheme" | "darkTheme">(
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "darkTheme"
      : "lightTheme"
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const themeListener = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "darkTheme" : "lightTheme");
    };
    mediaQuery.addEventListener("change", themeListener);

    return () => mediaQuery.removeEventListener("change", themeListener);
  }, []);

  // Normalize and prepare driver data for the chart
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

  // ECharts configuration
  const options = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    legend: {
      data: [
        { name: "Time Gap (s)", icon: "rect" },
        { name: "Position", icon: "circle" },
      ],
      textStyle: {
        color: "inherit",
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
        color: theme === "darkTheme" ? "#A5A5A5" : "#555",
      },
      axisTick: { alignWithLabel: true },
    },
    yAxis: [
      {
        type: "value",
        name: "Time Gap (s)",
        axisLabel: {
          fontSize: 12,
          color: theme === "darkTheme" ? "#A5A5A5" : "#555",
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
          },
        },
        min: 0,
      },
      {
        type: "value",
        name: "Position",
      },
    ],
    series: [
      {
        name: "Time Gap (s)",
        type: "bar",
        data: chartData.map((driver) => driver.gap ?? "-"),
        itemStyle: { color: "#8884d8" },
        barMaxWidth: "30%",
      },
      {
        name: "Position",
        type: "line",
        yAxisIndex: 0,
        data: chartData.map((driver) => driver.position),
        lineStyle: { color: "#ff7300", width: 2 },
        symbol: "circle",
        symbolSize: 10,
        itemStyle: {
          color: (params: { dataIndex: number }) => {
            const { dataIndex } = params;
            if (dataIndex === 0) return "#FFD700";
            if (dataIndex === 1) return "#C0C0C0";
            if (dataIndex === 2) return "#CD7F32";
            return "#ff7300";
          },
        },
        label: {
          show: true,
          position: "top",
          formatter: (params: { dataIndex: number }) =>
            params.dataIndex === 0
              ? "🥇"
              : params.dataIndex === 1
              ? "🥈"
              : params.dataIndex === 2
              ? "🥉"
              : "",
        },
      },
      {
        name: "Status",
        type: "line",
        data: chartData.map((driver) => ({
          value: driver.status,
          itemStyle: {
            color: driver.status === "Finished" ? "#68d391" : "#f01a1a",
          },
        })),
      },
    ],
  };

  return (
    <div className="w-full h-[calc(100vh-200px)] dark:bg-secondary-dark rounded-lg shadow-md p-4">
      <ReactECharts
        option={options}
        theme={theme}
        style={{ height: "100%", width: "100%" }}
        opts={{ renderer: "canvas" }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
};

export default DriverPerformanceChart;
