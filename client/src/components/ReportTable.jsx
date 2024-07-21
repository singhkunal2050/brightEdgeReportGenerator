import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function ReportTable({ data }) {
  return (
    <TableContainer component={Paper}>
      {Array.isArray(data) && data?.length > 0 && (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              {Object.keys(data[0]).map((key) => (
                <TableCell style={{ fontWeight: "600" }} key={key}>
                  {key}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length &&
              data.map((row) => (
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
