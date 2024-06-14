// src/components/DataGridComponent.js
import React, { useContext, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DataContext } from "../../context/Datacontext";
import { Box, CircularProgress, Typography } from "@mui/material";

const DataGridComponent = () => {
  const { data, isLoading, error } = useContext(DataContext);

  useEffect(() => {
    console.log("Data from context:", data); // Log the data from context
  }, [data]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  const columns = [
    { field: "displayName", headerName: "Display Name", width: 200 },
    {
      field: "articulationScore",
      headerName: "Articulation Score",
      width: 150,
    },
    { field: "avgRating", headerName: "Average Rating", width: 150 },
    { field: "createdBy", headerName: "Created By", width: 200 },
    {
      field: "createdOn",
      headerName: "Created On",
      width: 200,
      type: "dateTime",
    },
    { field: "lastModifiedBy", headerName: "Last Modified By", width: 200 },
    {
      field: "lastModifiedOn",
      headerName: "Last Modified On",
      width: 200,
      type: "dateTime",
    },
    { field: "ratingsCount", headerName: "Ratings Count", width: 150 },
    { field: "resourceType", headerName: "Resource Type", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      valueGetter: (params) => params.row.status.name,
    },
    {
      field: "domain",
      headerName: "Domain",
      width: 200,
      valueGetter: (params) => params.row.domain.name,
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
      valueGetter: (params) => params.row.type.name,
    },
    { field: "system", headerName: "System", width: 150 },
  ];

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={data.results}
        columns={columns}
        pageSize={10}
        getRowId={(row) => row.id}
      />
    </Box>
  );
};

export default DataGridComponent;
