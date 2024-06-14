import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const BarChartComponent = ({ data }) => {
  const chartData = data.map((item) => ({
    name: item.name,
    articulationScore: item.articulationScore,
    avgRating: item.avgRating,
  }));
  console.log("barcchart data", data);
  return (
    <ResponsiveBar
      data={chartData}
      keys={["articulationScore", "avgRating"]}
      indexBy="name"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "name",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "score",
        legendPosition: "middle",
        legendOffset: -40,
      }}
    />
  );
};

export default BarChartComponent;
