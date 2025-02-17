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
  const [url, setURL] = useState(
    "https://www.google.com/, https://www.facebook.com/, https://www.youtube.com/, https://www.twitter.com/, https://www.instagram.com/, https://www.linkedin.com/"
    // https://www.tumblr.com/, https://www.microsoft.com/, https://www.bing.com/,  https://www.github.com/, https://www.dropbox.com/, https://www.spotify.com/, https://www.airbnb.com/, https://www.medium.com/ "
  );
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const doesEntryExist = (entry) => {
    return results.filter((row) => row.website === entry.website)?.length > 0;
  };

  function generateRandomId(length = 10) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const addRowIfNotExists = (response) => {
    const newEntry = {
      id: generateRandomId(),
      website: response.record.key.origin,
      etfb: response.record.metrics.experimental_time_to_first_byte.percentiles
        .p75,
      lcp: response.record.metrics.largest_contentful_paint.percentiles.p75,
      period: response.record.collectionPeriod.firstDate.month,
      sum:
        response.record.metrics.experimental_time_to_first_byte.percentiles
          .p75 *
          0.5 +
        response.record.metrics.largest_contentful_paint.percentiles.p75 * 0.5 +
        response.record.collectionPeriod.firstDate.month * 0.5,
      avg:
        (response.record.metrics.experimental_time_to_first_byte.percentiles
          .p75 *
          0.5 +
          response.record.metrics.largest_contentful_paint.percentiles.p75 *
            0.5 +
          response.record.collectionPeriod.firstDate.month * 0.5) /
        3,
      summary: JSON.stringify(response.record),
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
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/data/?url=${url}`)
      );
      const responses = await Promise.all(promises);
      debugger;
      const dataPromises = responses.map((response) => response.json());
      const data = await Promise.all(dataPromises);

      console.log({ data });

      data.forEach((response) => {
        if (response?.record) {
          addRowIfNotExists(response);
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
        <Typography
          style={{ fontWeight: "bold" }}
          variant="h5"
          component="h5"
          align="center"
          marginBlock={3}
        >
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
