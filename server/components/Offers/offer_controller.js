import logger from "../../utils/logger.js"; // Import logger utility
import UserModel from "../Users/user_module.js"; // Import the User model
import OfferModel from "./offer_module.js"; // Import the Offer model

// Function to create a new offer
export const createOffer = async (req, res) => {
  try {
    const { id, title, description, tags } = req.body;

    logger.info("Received request to create an offer", { userId: id, title });

    const userExist = await UserModel.findById(id);
    if (!userExist) {
      logger.info("User not found", { userId: id });
      return res.status(400).json({
        message: "User does not exist",
        error: true,
      });
    }

    const newOffer = new OfferModel({
      userId: id,
      title,
      description,
      tags,
    });

    await newOffer.save();

    logger.info("Offer created successfully", { offerId: newOffer._id, userId: id });

    return res.status(201).json({
      message: "Offer created successfully",
      data: newOffer,
      success: true,
    });
  } catch (error) {
    logger.error("Error in createOffer controller", { error: error.message });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get a specific offer by user ID
export const getOffer = async (req, res) => {
  try {
    const { userId } = req.body;

    logger.info("Fetching offer for user", { userId });

    const offer = await OfferModel.findOne({ userId });
    if (!offer) {
      logger.info("Offer not found for user", { userId });
      return res.status(400).json({
        message: "Offer does not exist",
        error: true,
      });
    }

    logger.info("Offer retrieved successfully", { offerId: offer._id, userId });

    return res.status(200).json({
      message: "Request completed successfully",
      data: offer,
      success: true,
    });
  } catch (error) {
    logger.error("Error in getOffer controller", { error: error.message });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get all offers from the database
export const getAllOffers = async (req, res) => {
  try {
    logger.info("Fetching all offers");

    const offers = await OfferModel.find();
    if (!offers.length) {
      logger.info("No offers found");
      return res.status(404).json({
        message: "No offers found",
        error: true,
      });
    }

    logger.info("Offers retrieved successfully", { count: offers.length });

    return res.status(200).json({
      message: "Offers retrieved successfully",
      data: offers,
      success: true,
    });
  } catch (error) {
    logger.error("Error in getAllOffers controller", { error: error.message });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
