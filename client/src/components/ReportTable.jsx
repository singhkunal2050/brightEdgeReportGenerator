import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Tooltip } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

export default function ReportTable({ data }) {
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("");

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortColumn(column);
  };

  const sortData = (data) => {
    if (!sortColumn) return data;
    return [...data].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  };

  const sortedData = sortData(data);

  return (
    <TableContainer component={Paper}>
      {Array.isArray(sortedData) && sortedData.length > 0 && (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              {Object.keys(sortedData[0]).map((key) => (
                <TableCell style={{ fontWeight: "600" }} key={key}>
                  {key}
                  {(key === "etfb" || key === "lcp") && (
                    <Tooltip
                      title={
                        sortDirection === "asc"
                          ? "Sort Descending"
                          : "Sort Ascending"
                      }
                    >
                      <IconButton
                        aria-label={`sort ${key}`}
                        onClick={() => handleSort(key)}
                        size="small"
                        style={{ marginLeft: 8 }}
                      >
                        {sortColumn === key ? (
                          sortDirection === "asc" ? (
                            <ArrowUpward
                              style={{ color: "black" }}
                              fontSize="inherit"
                            />
                          ) : (
                            <ArrowDownward
                              style={{ color: "black" }}
                              fontSize="inherit"
                            />
                          )
                        ) : (
                          <ArrowDownward
                            fontSize="inherit"
                            style={{ color: "black", opacity: ".2" }}
                          />
                        )}
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow key={row.website}>
                <TableCell align="left">{row.website}</TableCell>
                <TableCell align="left">{row.etfb}</TableCell>
                <TableCell align="left">{row.lcp}</TableCell>
                <TableCell align="left">{row.period}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
