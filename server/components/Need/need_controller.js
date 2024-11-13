import UserModel from "../Users/user_module.js";
import NeedModel from "./need_module.js";

// Create a new need
export const createNeed = async (req, res) => {
  try {
    const { userId, description, category } = req.body;

    // Ensure the user exists
    const userExist = await UserModel.findById(userId);
    if (!userExist) {
      return res.status(400).json({
        message: "User not found",
        error: true,
      });
    }

    // Create a new need
    const newNeed = new NeedModel({
      userId,
      description,
      category,
    });

    // Save the need
    await newNeed.save();

    return res.status(201).json({
      message: "Need created successfully",
      data: newNeed,
      success: true,
    });
  } catch (error) {
    console.error("Error in createNeed controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// View all needs
export const viewNeeds = async (req, res) => {
  try {
    const needs = await NeedModel.find();
    if (!needs.length) {
      return res.status(400).json({
        message: "No needs available",
        error: true,
      });
    }

    return res.status(200).json({
      message: "Needs fetched successfully",
      data: needs,
      success: true,
    });
  } catch (error) {
    console.error("Error in viewNeeds controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// View a single need
export const viewSingleNeed = async (req, res) => {
  try {
    const {id}  = req.params;
   
    

    const need = await NeedModel.findById(id);
    if (!need) {
      return res.status(404).json({
        message: "Need not found",
        error: true,
      });
    }

    return res.status(200).json({
      message: "Need fetched successfully",
      data: need,
      success: true,
    });
  } catch (error) {
    console.error("Error in viewSingleNeed controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
