import {
  Alert,
  Button,
  Container,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ReportTable from "./ReportTable.jsx";
import { useState } from "react";

export function ReportGenerator() {
  const [url, setURL] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const doesEntryExist = (entry) => {
    return results.filter((row) => row.website === entry.website)?.length > 0;
  };

  const addRowIfNotExists = (response) => {
    const newEntry = {
      website: response.record.key.origin,
      etfb: response.record.metrics.experimental_time_to_first_byte.percentiles
        .p75,
      lcp: response.record.metrics.largest_contentful_paint.percentiles.p75,
      period: response.record.collectionPeriod.firstDate.month,
    };

    if (!doesEntryExist(newEntry)) {
      setResults((prevResults) => [...prevResults, newEntry]);
    }
  };

  const handleURLSubmission = async (event) => {
    try {
      setIsLoading(true);
      event.preventDefault();

      const allUrls = url.split(",");
      const promises = allUrls.map((url) =>
        fetch(`http://localhost:3000/api/data/?url=${url}`)
      );
      const responses = await Promise.all(promises);
      const dataPromises = responses.map((response) => response.json());
      const data = await Promise.all(dataPromises);

      console.log({ data });

      data.forEach((response) => {
        if (response?.record) {
          addRowIfNotExists(response);
        } else {
          throw new Error(response?.message ?? "Something went wrong");
        }
      });
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmissionDisabled = () => {
    if (url === "") {
      return true;
    } else {
      return !url.startsWith("https://");
    }
  };

  return (
    <div>
      <Container>
        {error && (
          <Alert
            severity="error"
            onClose={() => {
              setError("");
            }}
          >
            {error}
          </Alert>
        )}
        <Typography variant="h3" component="h3" align="center" marginBlock={3}>
          BrigthEdge Report Generator
        </Typography>
        <Grid container gap={1} justifyContent={"space-evenly"}>
          <Grid item xs={12} md={1}>
            <Typography variant="h6" component="h6">
              URL
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Input
              type="url"
              placeholder="Eg: https://www.bing.com/"
              fullWidth={true}
              value={url}
              onChange={(event) => setURL(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={1}>
            <Button
              fullWidth={true}
              disabled={isSubmissionDisabled()}
              onClick={handleURLSubmission}
              variant="contained"
              title={isSubmissionDisabled ? "Please enter a URL" : ""}
            >
              {isLoading ? (
                <CircularProgress style={{ color: "white" }} size={20} />
              ) : (
                "Search"
              )}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <ReportTable data={results} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
