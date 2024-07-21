const allowedOrigins = [
  "http://localhost:5173",
  "https://BrightreportGenerator.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

exports.corsOptions = corsOptions;
