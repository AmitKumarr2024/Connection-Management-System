import express from "express";
import { createNeed, viewNeeds, viewSingleNeed } from "./need_controller.js";

const route = express.Router();

route.post("/create", createNeed);
route.get("/", viewNeeds);
route.get("/:id", viewSingleNeed);

export default route;
