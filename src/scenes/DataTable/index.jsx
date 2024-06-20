import React, { useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DataContext } from "../../context/Datacontext";
import { Box } from "@mui/material";

const DataTable = () => {
  const { data } = useContext(DataContext);

  const columns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "createdBy", headerName: "Created By", width: 200 },
    {
      field: "createdOn",
      headerName: "Created On",
      width: 200,
      type: "dateTime",
      valueGetter: (params) => new Date(params.value),
    },
    { field: "lastModifiedBy", headerName: "Last Modified By", width: 200 },
    {
      field: "lastModifiedOn",
      headerName: "Last Modified On",
      width: 200,
      type: "dateTime",
      valueGetter: (params) => new Date(params.value),
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "displayName", headerName: "Display Name", width: 200 },
    {
      field: "articulationScore",
      headerName: "Articulation Score",
      width: 150,
    },
    {
      field: "domain",
      headerName: "Domain",
      width: 200,
      valueGetter: (params) => params.value.name,
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
      valueGetter: (params) => params.value.name,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      valueGetter: (params) => params.value.name,
    },
    { field: "avgRating", headerName: "Average Rating", width: 150 },
    { field: "ratingsCount", headerName: "Ratings Count", width: 150 },
  ];

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={data.results}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowId={(row) => row.id}
      />
    </Box>
  );
};

export default DataTable;
