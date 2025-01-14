import logger from "../../utils/logger.js"; // Import logger utility
import ProjectModel from "./project_modules.js"; // Import the Project model to interact with the project data

// Controller to create a new project
export const createProject = async (req, res) => {
  try {
    const {
      projectName,
      description,
      timeline,
      associatedUsers,
      resourcesNeeded,
      status,
    } = req.body;

    logger.info("Received request to create a project", { projectName });

    const newProject = new ProjectModel({
      projectName,
      description,
      timeline,
      associatedUsers,
      resourcesNeeded,
      status,
    });

    await newProject.save();

    logger.info("Project created successfully", { projectId: newProject._id });

    return res.status(201).json({
      message: "Project created successfully",
      data: newProject,
      success: true,
    });
  } catch (error) {
    logger.error("Error in createProject controller", { error: error.message });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to fetch details of a single project
export const getSingleProject = async (req, res) => {
  try {
    const { id } = req.params;

    logger.info("Fetching project details", { projectId: id });

    const project = await ProjectModel.findById(id).populate("associatedUsers");
    if (!project) {
      logger.info("Project not found", { projectId: id });
      return res.status(404).json({
        message: "Project not found",
        error: true,
      });
    }

    logger.info("Project details fetched successfully", { projectId: id });

    return res.status(200).json({
      message: "Project details fetched successfully",
      data: project,
      success: true,
    });
  } catch (error) {
    logger.error("Error in getSingleProject controller", { error: error.message });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to fetch all projects
export const getAllProjects = async (req, res) => {
  try {
    logger.info("Fetching all projects");

    const projects = await ProjectModel.find().populate("associatedUsers");
    if (!projects || projects.length === 0) {
      logger.info("No projects available");
      return res.status(404).json({
        message: "No projects available",
        data: [],
        error: true,
      });
    }

    logger.info("Projects fetched successfully", { count: projects.length });

    return res.status(200).json({
      message: "Projects fetched successfully",
      data: projects,
      success: true,
    });
  } catch (error) {
    logger.error("Error in getAllProjects controller", { error: error.message });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to update the status of a project
export const updateProjectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    logger.info("Updating project status", { projectId: id, newStatus: status });

    const project = await ProjectModel.findById(id).populate("associatedUsers");
    if (!project) {
      logger.info("Project not found", { projectId: id });
      return res.status(404).json({
        message: "Project not found",
        error: true,
      });
    }

    const allUsersMatchStatus = project.associatedUsers.every(
      (user) => user.status === status
    );

    if (!allUsersMatchStatus) {
      logger.info("Not all associated users have the required status", {
        projectId: id,
        newStatus: status,
      });
      return res.status(400).json({
        message: "Not all associated users have the required status",
        success: false,
      });
    }

    project.status = status;
    await project.save();

    logger.info("Project status updated successfully", {
      projectId: id,
      updatedStatus: status,
    });

    return res.status(200).json({
      message: "Project status updated successfully",
      data: project,
      success: true,
    });
  } catch (error) {
    logger.error("Error in updateProjectStatus controller", { error: error.message });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
