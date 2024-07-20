import { Button, Container, Grid, Input, Typography } from "@mui/material";
import ReportTable from "./ReportTable.jsx";
import { useState } from "react";

export function ReportGenerator() {
  const [url, setURL] = useState("https://singhkunal2050.dev/");
  const [results, setResults] = useState([]);

  const handleURLSubmission = async (event) => {
    event.preventDefault();
    // const results = await fetch(
    //   `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${
    //     import.meta.env.VITE_SOME_KEY
    //   }`,
    //   {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       formFactor: "PHONE",
    //       origin: url,
    //       metrics: [
    //         "largest_contentful_paint",
    //         "experimental_time_to_first_byte",
    //       ],
    //     }),
    //   }
    // );
    // console.log({ results });
    const response = {
      record: {
        key: {
          formFactor: "PHONE",
          origin: "https://developer.intuit.com",
        },
        metrics: {
          experimental_time_to_first_byte: {
            histogram: [
              {
                start: 0,
                end: 800,
                density: 0.5244,
              },
              {
                start: 800,
                end: 1800,
                density: 0.3453,
              },
              {
                start: 1800,
                density: 0.1303,
              },
            ],
            percentiles: {
              p75: 1500,
            },
          },
          largest_contentful_paint: {
            histogram: [
              {
                start: 0,
                end: 2500,
                density: 0.1954,
              },
              {
                start: 2500,
                end: 4000,
                density: 0.2606,
              },
              {
                start: 4000,
                density: 0.544,
              },
            ],
            percentiles: {
              p75: 7782,
            },
          },
        },
        collectionPeriod: {
          firstDate: {
            year: 2024,
            month: 6,
            day: 21,
          },
          lastDate: {
            year: 2024,
            month: 7,
            day: 18,
          },
        },
      },
      urlNormalizationDetails: {
        originalUrl: "https://developer.intuit.com/",
        normalizedUrl: "https://developer.intuit.com",
      },
    };

    setResults([
      ...results,
      {
        website: response.record.key.origin,
        etfb: response.record.metrics.experimental_time_to_first_byte
          .percentiles.p75,
        lcp: response.record.metrics.largest_contentful_paint.percentiles.p75,
        period: response.record.collectionPeriod.firstDate.month,
      },
    ]);

    // Transfor results to [{}]
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
        <Grid container gap={1} justifyContent={"space-evenly"}>
          <Grid item xs={1}>
            <Typography variant="h6" component="h6">
              URL
            </Typography>
          </Grid>
          <Grid item xs={4} md={8}>
            <Input
              type="url"
              placeholder="Enter a valid website url"
              fullWidth={true}
              value={url}
              onChange={(event) => setURL(event.target.value)}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              disabled={isSubmissionDisabled()}
              onClick={handleURLSubmission}
              variant="contained"
              title={isSubmissionDisabled ? "Please enter a URL" : ""}
            >
              Search
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
