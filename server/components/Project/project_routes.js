import express from "express";
import {
  createProject,
  getAllProjects,
  getSingleProject,
} from "./project_controller.js";

const route = new express.Router();

route.post("/create", createProject);
route.get("/all-project", getAllProjects);
route.get("/single-project/:id", getSingleProject);

export default route;
