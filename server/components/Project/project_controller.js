import ProjectModel from "./project_modules.js";

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

    const newProject = new ProjectModel({
      projectName,
      description,
      timeline,
      associatedUsers,
      resourcesNeeded,
      status,
    });

    await newProject.save();

    return res.status(201).json({
      message: "Project created successfully",
      data: newProject,
      success: true,
    });
  } catch (error) {
    console.error("Error in createProject controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSingleProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await ProjectModel.findById(id).populate("associatedUsers");
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
        error: true,
      });
    }

    res.status(200).json({
      message: "Project details fetched successfully",
      data: project,
      success: true,
    });
  } catch (error) {
    console.error("Error in getSingleProject controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.find().populate("associatedUsers");
    if (!projects || projects.length === 0) {
      return res.status(404).json({
        message: "No projects available",
        data: [],
        error: true,
      });
    }

    res.status(200).json({
      message: "Projects fetched successfully",
      data: projects,
      success: true,
    });
  } catch (error) {
    console.error("Error in getAllProjects controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProjectStatus = async (req, res) => {
  try {
    const { id } = req.params; // project ID
    const { status } = req.body; // new project status

    // Find the project and populate associated users
    const project = await ProjectModel.findById(id).populate("associatedUsers");
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
        error: true,
      });
    }

    // Check if all associated users have the required status
    const allUsersMatchStatus = project.associatedUsers.every(
      (user) => user.status === status
    );

    if (!allUsersMatchStatus) {
      return res.status(400).json({
        message: "Not all associated users have the required status",
        success: false,
      });
    }

    // Update the project status if all associated users match
    project.status = status;
    await project.save();

    return res.status(200).json({
      message: "Project status updated successfully",
      data: project,
      success: true,
    });
  } catch (error) {
    console.error("Error in updateProjectStatus controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
