import path from "path";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectToMongoDb from "./config/connectMongodb.js";
import UserRoute from "./components/Users/user_routes.js";
import OfferRoute from "./components/Offers/offer_routes.js";
import NeedRoute from "./components/Need/need_routes.js";
import ProjectRoute from "./components/Project/project_routes.js";
import ConnectionRouter from "./components/Connection/connection_routes.js";
import ReportRouter from "./components/report/report.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "./utils/logger.js"; // Assuming a logger utility is configured

const app = express();
const Port = process.env.PORT || 8009;
const __dirname = path.resolve();

logger.info("Initializing the server...");

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials to be sent
  })
);
logger.info("CORS configured successfully.");

app.use(express.static(path.join(__dirname, "client/dist")));
logger.info("Static files served from /client/dist.");

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
logger.info("Body parsers configured (JSON and URL-encoded).");

app.use(cookieParser());
logger.info("Cookie parser initialized.");

// Route setup
app.use("/api/user/", UserRoute);
logger.info("User routes configured.");

app.use("/api/offer/", OfferRoute);
logger.info("Offer routes configured.");

app.use("/api/need/", NeedRoute);
logger.info("Need routes configured.");

app.use("/api/projects/", ProjectRoute);
logger.info("Project routes configured.");

app.use("/api/connection", ConnectionRouter);
logger.info("Connection routes configured.");

app.use("/api/report", ReportRouter);
logger.info("Report routes configured.");

// Start the server
app.listen(Port, () => {
  logger.info(`Server started successfully on port ${Port}`);
  connectToMongoDb();
});
