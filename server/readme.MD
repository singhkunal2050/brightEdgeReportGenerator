# Summary

### This is the server for the BrigthEdge Report Generator

It is essentially a simple express server that acts as a proxy to the chromeuxreport API and serves the results to the client.

### Installation

1. Install the dependencies

```bash
npm install
```

2. Setup the environment variables in the `.env` file inside the `server` folder

```.env
CRUX_API_KEY=YOUR_API_KEY
```

### To run the server

```bash
npm run start
```

# API Documentation

## Endpoint: Fetch Data from External URL

### URL

`http://localhost:3000/api/data`

### Method

`GET`

### Query Parameters

- `url` (string, required): The URL of the external site from which to fetch data.

### Example Request

```bash
GET http://localhost:3000/api/data/?url=https://www.bing.com/
```

### Example Response

```json
{
  "record": {
    "key": {
      "formFactor": "PHONE",
      "origin": "https://www.bing.com"
    },
    "metrics": {
      "experimental_time_to_first_byte": {
        "histogram": [
          {
            "start": 0,
            "end": 800,
            "density": 0.8544
          },
          {
            "start": 800,
            "end": 1800,
            "density": 0.112
          },
          {
            "start": 1800,
            "density": 0.0336
          }
        ],
        "percentiles": {
          "p75": 524
        }
      },
      "largest_contentful_paint": {
        "histogram": [
          {
            "start": 0,
            "end": 2500,
            "density": 0.9034
          },
          {
            "start": 2500,
            "end": 4000,
            "density": 0.0544
          },
          {
            "start": 4000,
            "density": 0.0422
          }
        ],
        "percentiles": {
          "p75": 1444
        }
      }
    },
    "collectionPeriod": {
      "firstDate": {
        "year": 2024,
        "month": 6,
        "day": 21
      },
      "lastDate": {
        "year": 2024,
        "month": 7,
        "day": 18
      }
    }
  },
  "urlNormalizationDetails": {
    "originalUrl": "https://www.bing.com/",
    "normalizedUrl": "https://www.bing.com"
  }
}
```
