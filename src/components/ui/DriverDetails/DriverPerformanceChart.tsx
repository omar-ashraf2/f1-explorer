import ReactECharts from "echarts-for-react";
import { Driver } from "../../../api/raceDetailsApi";
import { useTheme } from "../../../context/ThemeContext";
import { transformDriverData } from "../../../utils/chartUtils";

interface DriverPerformanceChartProps {
  drivers: Driver[];
}

const DriverPerformanceChart: React.FC<DriverPerformanceChartProps> = ({
  drivers,
}) => {
  const { theme } = useTheme();

  const chartData = transformDriverData(drivers);

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
        color: theme === "dark" ? "#A5A5A5" : "#555",
      },
      axisTick: { alignWithLabel: true },
    },
    yAxis: [
      {
        type: "value",
        name: "Time Gap (s)",
        axisLabel: {
          fontSize: 12,
          color: theme === "dark" ? "#A5A5A5" : "#555",
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: theme === "dark" ? "#a5a5a54d" : "#5555554f",
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
    <div className="min-w-[600px] w-full h-[calc(100vh-200px)] bg-accent-light dark:bg-secondary-dark rounded-lg shadow-lg p-4">
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
