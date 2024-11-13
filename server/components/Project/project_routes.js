import express from "express";
import {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProjectStatus,
} from "./project_controller.js";

const route = new express.Router();

route.post("/create", createProject);
route.get("/all-project", getAllProjects);
route.get("/single-project/:id", getSingleProject);
route.put("/update-project/:id", updateProjectStatus);

export default route;
