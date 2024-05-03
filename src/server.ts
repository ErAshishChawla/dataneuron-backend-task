import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { apiPaths } from "./lib/api-paths";

import { apiRouter } from "./routes/api-router";
import { apiResponse } from "./lib/api-response";
import { connectDB } from "./lib/db.js";

import "dotenv/config";

// Create an Express application
const app = express();

// Adding Standard Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Specify the exact origin
    credentials: true, // Allow credentials
  })
);
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("Request received at: ", new Date().toISOString());
  next();
});

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
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to DB");
    console.log(err);
    process.exit(1);
  });
