import UserModel from "./user_module.js";
import NeedModel from "../Need/need_module.js";
import OfferModel from "../Offers/offer_module.js";
import ProjectModel from "../Project/project_modules.js";
import ConnectionModel from "../Connection/connection_module.js";

export const createIntake = async (req, res) => {
  try {
    const { fullName, email, gender, role, profilePic } = req.body;

    // Validation check
    if (!fullName || !email || !gender) {
      return res.status(400).json({
        message: "Full name, email, and gender are required.",
        error: true,
      });
    }

    const userExist = await UserModel.findOne({ email });
    if (userExist) {
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

    return res.status(201).json({
      message: "User created successfully",
      data: newUser,
      success: true,
    });
  } catch (error) {
    console.error("Error in createIntake controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const allUser = async (req, res) => {
  try {
    const user = await UserModel.find();
    if (!user) {
      return res.status(400).json({
        message: "No User available",
        data: [],
        error: true,
      });
    }

    res.status(200).json({
      message: "Request complete Successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    console.error("Error in allUser controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const singleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
      });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    console.error("Error in singleUser controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchDataByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const [needs, offers, projects, connections] = await Promise.all([
      NeedModel.find({ userId }),
      OfferModel.find({ userId }),
      ProjectModel.find({ userId }),
      ConnectionModel.find({ userId }),
    ]);

    res.status(200).json({
      message: "Data fetched successfully",
      data: { needs, offers, projects, connections },
      success: true,
    });
  } catch (error) {
    console.error("Error in fetchDataByUserId controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
