import { Button, Container, Grid, Input, Typography } from "@mui/material";
import ReportTable from "./ReportTable.jsx";
import { useState } from "react";

export function ReportGenerator() {
  const [url, setURL] = useState("");

  const handleURLSubmission = (event) => {
    event.preventDefault();
    console.log("URL submitted", event.target.value);
  };

  const isSubmissionDisabled = () => {
    if (url === "") {
      return true;
    } else {
      return !url.startsWith("https://") || !url.startsWith("https://");
    }
  };

  return (
    <div>
      <Container>
        <Typography variant="h3" component="h3" align="center" marginBlock={3}>
          BrigthEdge Report Generator
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Typography variant="h6" component="h6">
              URL
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Input
              type="url"
              placeholder="Enter a valid website url"
              fullWidth={true}
              onChange={(event) => setURL(event.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              disabled={isSubmissionDisabled()}
              onClick={handleURLSubmission}
              variant="contained"
              title={isSubmissionDisabled ? "Please enter a URL" : ""}
            >
              Generate Report
            </Button>
          </Grid>
          <Grid item xs={12}>
            <ReportTable />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
