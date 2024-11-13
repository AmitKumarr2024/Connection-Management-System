import UserModel from "../Users/user_module.js";  // Import the User model to interact with user data
import NeedModel from "./need_module.js";  // Import the Need model to interact with need data

// Create a new need
export const createNeed = async (req, res) => {
  try {
    const { userId, description, category } = req.body;  // Extract userId, description, and category from the request body

    // Ensure the user exists by looking for the user in the database
    const userExist = await UserModel.findById(userId);
    if (!userExist) {  // If user does not exist, return an error response
      return res.status(400).json({
        message: "User not found",
        error: true,
      });
    }

    // Create a new need object with the provided details
    const newNeed = new NeedModel({
      userId,  // Link this need to the user by their userId
      description,  // Add the description of the need
      category,  // Add the category of the need
    });

    // Save the new need in the database
    await newNeed.save();

    // Return a success response with the newly created need
    return res.status(201).json({
      message: "Need created successfully",
      data: newNeed,
      success: true,
    });
  } catch (error) {
    console.error("Error in createNeed controller", error.message);  // Log any errors
    return res.status(500).json({ error: "Internal Server Error" });  // Return a generic server error if something goes wrong
  }
};

// View all needs
export const viewNeeds = async (req, res) => {
  try {
    const needs = await NeedModel.find();  // Fetch all needs from the database
    if (!needs.length) {  // If no needs are found, return an error response
      return res.status(400).json({
        message: "No needs available",
        error: true,
      });
    }

    // Return a success response with all the fetched needs
    return res.status(200).json({
      message: "Needs fetched successfully",
      data: needs,
      success: true,
    });
  } catch (error) {
    console.error("Error in viewNeeds controller", error.message);  // Log any errors
    return res.status(500).json({ error: "Internal Server Error" });  // Return a server error if something goes wrong
  }
};

// View a single need by its ID
export const viewSingleNeed = async (req, res) => {
  try {
    const { id } = req.params;  // Extract the need ID from the request parameters

    const need = await NeedModel.findById(id);  // Find the need by its ID in the database
    if (!need) {  // If the need is not found, return an error response
      return res.status(404).json({
        message: "Need not found",
        error: true,
      });
    }

    // Return a success response with the found need
    return res.status(200).json({
      message: "Need fetched successfully",
      data: need,
      success: true,
    });
  } catch (error) {
    console.error("Error in viewSingleNeed controller", error.message);  // Log any errors
    return res.status(500).json({ error: "Internal Server Error" });  // Return a server error if something goes wrong
  }
};

// Update the status of a need (e.g., mark it as "Pending" or "Resolved")
export const updateNeedStatus = async (req, res) => {
  try {
    const { id } = req.params;  // Extract the need ID from the request parameters
    const { status } = req.body;  // Extract the new status from the request body

    // Ensure the provided status is valid (either "Pending" or "Resolved")
    if (!["Pending", "Resolved"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Allowed values are 'Pending' or 'Resolved'.",
        error: true,
      });
    }

    // Find the need by its ID and update the status
    const updatedNeed = await NeedModel.findByIdAndUpdate(
      id,
      { status },  // Update the status field with the new value
      { new: true }  // Return the updated document after the update
    );

    if (!updatedNeed) {  // If the need is not found, return an error response
      return res.status(404).json({
        message: "Need not found",
        error: true,
      });
    }

    // Return a success response with the updated need
    return res.status(200).json({
      message: "Need status updated successfully",
      data: updatedNeed,
      success: true,
    });
  } catch (error) {
    console.error("Error in updateNeedStatus controller", error.message);  // Log any errors
    return res.status(500).json({ error: "Internal Server Error" });  // Return a server error if something goes wrong
  }
};
