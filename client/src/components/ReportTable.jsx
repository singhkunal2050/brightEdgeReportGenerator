import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "website", headerName: "Website", width: 280 },
  { field: "etfb", headerName: "ETFB", width: 100 },
  { field: "lcp", headerName: "LCP", width: 100 },
  { field: "period", headerName: "Period", width: 100 },
  { field: "sum", headerName: "Sum", width: 100 },
  { field: "avg", headerName: "Average", width: 100 },
  { field: "summary", headerName: "Summary", width: 300 },
];

export default function ReportTable({ data }) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
