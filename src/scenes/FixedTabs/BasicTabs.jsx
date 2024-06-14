import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DataGridComponent from "../ChartData/ChartData";
import BarChartComponent from "../ChartData/BarChart";
import { DataContext } from "../../context/Datacontext";

export default function BasicTabs() {
  const { data, isLoading, error } = React.useContext(DataContext);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Data Table" />
          <Tab label="Bar Chart" />
        </Tabs>
      </Box>
      {value === 0 && (
        <Box sx={{ p: 3 }}>
          {isLoading ? <p>Loading...</p> : <DataGridComponent data={data} />}
          {error && <p>{error.message}</p>}
        </Box>
      )}
      {value === 1 && (
        <Box sx={{ p: 3 }}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <BarChartComponent data={data.results} />
          )}
          {error && <p>{error.message}</p>}
        </Box>
      )}
    </Box>
  );
}
