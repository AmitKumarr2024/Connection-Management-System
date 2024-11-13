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
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const Port = process.env.PORT || 8009;
const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials to be sent
  })
);

app.use(express.static(path.join(__dirname, "client/dist")));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());

app.use("/api/user/", UserRoute);
app.use("/api/offer/", OfferRoute);
app.use("/api/need/", NeedRoute);
app.use("/api/projects/", ProjectRoute);
app.use("/api/connection", ConnectionRouter);

app.listen(Port, () => {
  console.log("Server started successfully on port", Port);
  connectToMongoDb();
});
