import ReactECharts from "echarts-for-react";

interface Driver {
  givenName: string;
  familyName: string;
  time: string;
  status: string;
  position: string;
}

interface DriverPerformanceChartProps {
  drivers: Driver[];
}

const DriverPerformanceChart: React.FC<DriverPerformanceChartProps> = ({
  drivers,
}) => {
  const chartData = drivers?.map((driver) => ({
    name: `${driver.givenName} ${driver.familyName}`,
    time:
      driver.time === "N/A"
        ? 0
        : parseFloat(driver.time.replace(/[^0-9.]/g, "")),
    status: driver.status || "N/A",
    position: parseInt(driver.position, 10),
  }));

  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["Time (s)", "Position", "Status"],
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
        fontSize: 10,
        color: "#333",
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        fontSize: 10,
        color: "#333",
      },
    },
    series: [
      {
        name: "Time (s)",
        type: "bar",
        data: chartData.map((driver) => driver.time),
        itemStyle: {
          color: "#8884d8",
        },
      },
      {
        name: "Position",
        type: "bar",
        data: chartData.map((driver) => driver.position),
        itemStyle: {
          color: "#ffc658",
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
    <div className="w-full h-[calc(100vh-200px)] bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Driver Performance Chart
      </h2>
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
