import UserModel from "./user_module.js";
import NeedModel from "../Need/need_module.js";
import OfferModel from "../Offers/offer_module.js";
import ProjectModel from "../Project/project_modules.js";
import ConnectionModel from "../Connection/connection_module.js";
import logger from "../../utils/logger.js"; // Assuming a logger utility is configured

export const createIntake = async (req, res) => {
  try {
    const { fullName, email, gender, role, profilePic } = req.body;

    logger.info("Received request to create a new user.", { fullName, email });

    // Validation check
    if (!fullName || !email || !gender) {
      logger.info("Validation failed for user creation request.");
      return res.status(400).json({
        message: "Full name, email, and gender are required.",
        error: true,
      });
    }

    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      logger.info("User already exists in the database.", { email });
      return res.status(400).json({
        message: "User already exists",
        error: true,
      });
    }

    const newUser = new UserModel({
      fullName,
      email,
      gender,
      role,
      profilePic,
    });

    await newUser.save();
    logger.info("New user created successfully.", { userId: newUser._id });

    return res.status(201).json({
      message: "User created successfully",
      data: newUser,
      success: true,
    });
  } catch (error) {
    logger.error("Error in createIntake controller.", { error: error.message });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const allUser = async (req, res) => {
  try {
    logger.info("Fetching all users.");
    const user = await UserModel.find();

    if (!user || user.length === 0) {
      logger.info("No users found in the database.");
      return res.status(400).json({
        message: "No User available",
        data: [],
        error: true,
      });
    }

    logger.info(`Fetched ${user.length} users from the database.`);
    res.status(200).json({
      message: "Request complete Successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    logger.error("Error in allUser controller.", { error: error.message });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const singleUser = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info("Fetching user details by ID.", { userId: id });

    const user = await UserModel.findById(id);

    if (!user) {
      logger.info("User not found.", { userId: id });
      return res.status(404).json({
        message: "User not found",
        error: true,
      });
    }

    logger.info("User details retrieved successfully.", { userId: id });
    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    logger.error("Error in singleUser controller.", { error: error.message });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchDataByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    logger.info("Fetching data for user by ID.", { userId });

    const [needs, offers, projects, connections] = await Promise.all([
      NeedModel.find({ userId }),
      OfferModel.find({ userId }),
      ProjectModel.find({ userId }),
      ConnectionModel.find({ userId }),
    ]);

    logger.info("Data fetched successfully for user.", { userId });
    res.status(200).json({
      message: "Data fetched successfully",
      data: { needs, offers, projects, connections },
      success: true,
    });
  } catch (error) {
    logger.error("Error in fetchDataByUserId controller.", {
      error: error.message,
    });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
