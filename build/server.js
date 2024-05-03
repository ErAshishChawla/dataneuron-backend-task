"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const api_paths_1 = require("./lib/api-paths");
const api_router_1 = require("./routes/api-router");
const api_response_1 = require("./lib/api-response");
const db_js_1 = require("./lib/db.js");
require("dotenv/config");
// Setting the PORT
const port = process.env.PORT || 4000;
// Create an Express application
const app = (0, express_1.default)();
// Adding Standard Middlewares
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL, // Specify the exact origin
    credentials: true, // Allow credentials
}));
app.use(body_parser_1.default.json());
// Setting up the API Router
app.use(api_paths_1.apiPaths.entry(), api_router_1.apiRouter);
// Handling 404 Errors
app.use((req, res) => {
    return res.status(404).json((0, api_response_1.apiResponse)(404, "Not Found"));
});
// DB Connection
(0, db_js_1.connectDB)()
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
