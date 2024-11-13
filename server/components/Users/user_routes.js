import express from "express";
import {
  allUser,
  createIntake,
  fetchDataByUserId,
  singleUser,
} from "./user_controller.js";

const route = new express.Router();

route.post("/create", createIntake);
route.get("/all-user", allUser);
route.get("/one-user/:id", singleUser);
route.get("/one-user-module/:id", fetchDataByUserId);

export default route;
