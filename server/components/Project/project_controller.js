import ProjectModel from "./project_modules.js";  // Import the Project model to interact with the project data

// Controller to create a new project
export const createProject = async (req, res) => {
  try {
    // Destructure the project details from the request body
    const {
      projectName,
      description,
      timeline,
      associatedUsers,
      resourcesNeeded,
      status,
    } = req.body;

    // Create a new project using the Project model
    const newProject = new ProjectModel({
      projectName,
      description,
      timeline,
      associatedUsers,
      resourcesNeeded,
      status,
    });

    // Save the new project to the database
    await newProject.save();

    // Return a success response with the created project details
    return res.status(201).json({
      message: "Project created successfully",
      data: newProject,
      success: true,
    });
  } catch (error) {
    // Log error and return a failure response
    console.error("Error in createProject controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to fetch details of a single project
export const getSingleProject = async (req, res) => {
  try {
    const { id } = req.params;  // Get the project ID from the request parameters

    // Find the project by its ID and populate associated users
    const project = await ProjectModel.findById(id).populate("associatedUsers");
    if (!project) {
      return res.status(404).json({
        message: "Project not found",  // Return error if project doesn't exist
        error: true,
      });
    }

    // Return the project details if found
    res.status(200).json({
      message: "Project details fetched successfully",
      data: project,
      success: true,
    });
  } catch (error) {
    // Log error and return a failure response
    console.error("Error in getSingleProject controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to fetch all projects
export const getAllProjects = async (req, res) => {
  try {
    // Fetch all projects and populate associated users
    const projects = await ProjectModel.find().populate("associatedUsers");
    if (!projects || projects.length === 0) {
      return res.status(404).json({
        message: "No projects available",  // Return error if no projects are found
        data: [],
        error: true,
      });
    }

    // Return all the projects
    res.status(200).json({
      message: "Projects fetched successfully",
      data: projects,
      success: true,
    });
  } catch (error) {
    // Log error and return a failure response
    console.error("Error in getAllProjects controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to update the status of a project
export const updateProjectStatus = async (req, res) => {
  try {
    const { id } = req.params; // Get the project ID from the request parameters
    const { status } = req.body; // Get the new project status from the request body

    // Find the project by ID and populate associated users
    const project = await ProjectModel.findById(id).populate("associatedUsers");
    if (!project) {
      return res.status(404).json({
        message: "Project not found",  // Return error if the project is not found
        error: true,
      });
    }

    // Check if all associated users have the required status
    const allUsersMatchStatus = project.associatedUsers.every(
      (user) => user.status === status
    );

    if (!allUsersMatchStatus) {
      return res.status(400).json({
        message: "Not all associated users have the required status",  // Return error if not all users have the required status
        success: false,
      });
    }

    // Update the project status if all users match the required status
    project.status = status;
    await project.save();

    // Return a success response with the updated project details
    return res.status(200).json({
      message: "Project status updated successfully",
      data: project,
      success: true,
    });
  } catch (error) {
    // Log error and return a failure response
    console.error("Error in updateProjectStatus controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
