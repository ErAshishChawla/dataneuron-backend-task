import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { apiPaths } from "./lib/api-paths";

import { apiRouter } from "./routes/api-router";
import { apiResponse } from "./lib/api-response";
import { connectDB } from "./lib/db.js";

import "dotenv/config";

// Setting the PORT
const port = process.env.PORT || 4000;

// Create an Express application
const app = express();

// Enable CORS
app.use(
  cors({
    origin:
      process.env.CLIENT_URL || "https://dataneuron-frontend-task.vercel.app/",
    credentials: true,
  })
);

app.use(bodyParser.json());

// Setting up the API Router
app.use(apiPaths.entry(), apiRouter);

// Handling 404 Errors
app.use((req, res) => {
  return res.status(404).json(apiResponse(404, "Not Found"));
});

// DB Connection
connectDB()
  .then(() => {
    console.log("Connected to DB");

    // Starting the Server
    app.listen(port, () => {
      console.log(`Server is running on PORT ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to DB");
    console.log(err);
    process.exit(1);
  });
