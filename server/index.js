const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/data", async (req, res) => {
  try {
    const url = req.query.url;
    const response = await axios.post(
      "https://chromeuxreport.googleapis.com/v1/records:queryRecord",
      {
        formFactor: "PHONE",
        origin: url,
        metrics: [
          "largest_contentful_paint",
          "experimental_time_to_first_byte",
        ],
      },
      {
        params: {
          key: process.env.CRUX_API_KEY,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data from API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
