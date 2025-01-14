import logger from "../../utils/logger.js";
import UserModel from "../Users/user_module.js";
import NeedModel from "./need_module.js";

// Create a new need
export const createNeed = async (req, res) => {
  try {
    const { userId, description, category } = req.body;
    logger.info(`Attempting to create need for user: ${userId}`);

    const userExist = await UserModel.findById(userId);
    if (!userExist) {
      logger.info(`User not found: ${userId}`);
      return res.status(400).json({ message: "User not found", error: true });
    }

    const newNeed = new NeedModel({ userId, description, category });
    await newNeed.save();

    logger.info(`Need created successfully for user: ${userId}`);
    return res.status(201).json({
      message: "Need created successfully",
      data: newNeed,
      success: true,
    });
  } catch (error) {
    logger.error("Error creating need:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// View all needs
export const viewNeeds = async (req, res) => {
  try {
    logger.info("Fetching all needs");

    const needs = await NeedModel.find();
    if (!needs.length) {
      logger.info("No needs available");
      return res.status(400).json({ message: "No needs available", error: true });
    }

    logger.info("Needs fetched successfully");
    return res.status(200).json({
      message: "Needs fetched successfully",
      data: needs,
      success: true,
    });
  } catch (error) {
    logger.error("Error fetching needs:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// View a single need by its ID
export const viewSingleNeed = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`Fetching need with ID: ${id}`);

    const need = await NeedModel.findById(id);
    if (!need) {
      logger.info(`Need not found with ID: ${id}`);
      return res.status(404).json({ message: "Need not found", error: true });
    }

    logger.info(`Need fetched successfully with ID: ${id}`);
    return res.status(200).json({
      message: "Need fetched successfully",
      data: need,
      success: true,
    });
  } catch (error) {
    logger.error("Error fetching need:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update the status of a need
export const updateNeedStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    logger.info(`Updating need status for ID: ${id} to status: ${status}`);

    if (!["Pending", "Resolved"].includes(status)) {
      logger.info("Invalid status provided");
      return res.status(400).json({
        message: "Invalid status. Allowed values are 'Pending' or 'Resolved'.",
        error: true,
      });
    }

    const updatedNeed = await NeedModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedNeed) {
      logger.info(`Need not found with ID: ${id}`);
      return res.status(404).json({ message: "Need not found", error: true });
    }

    logger.info(`Need status updated successfully for ID: ${id}`);
    return res.status(200).json({
      message: "Need status updated successfully",
      data: updatedNeed,
      success: true,
    });
  } catch (error) {
    logger.error("Error updating need status:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
