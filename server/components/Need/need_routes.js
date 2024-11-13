import express from "express";
import {
  createNeed,
  updateNeedStatus,
  viewNeeds,
  viewSingleNeed,
} from "./need_controller.js";

const route = express.Router();

route.post("/create", createNeed);
route.get("/", viewNeeds);
route.get("/:id", viewSingleNeed);
route.put("/update-need/:id", updateNeedStatus);

export default route;
