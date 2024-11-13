import UserModel from "../Users/user_module.js";
import OfferModel from "./offer_module.js";

export const createOffer = async (req, res) => {
  try {
    const { id, title, description, tags } = req.body;

    // Check if user exists
    const userExist = await UserModel.findById(id);
    if (!userExist) {
      return res.status(400).json({
        message: "User does not exist",
        error: true,
      });
    }

    // Create new offer
    const newOffer = new OfferModel({
      userId: id,
      title,
      description,
      tags,
    });

    // Save the offer
    await newOffer.save();

    return res.status(201).json({
      message: "Offer created successfully",
      data: newOffer,
      success: true,
    });
  } catch (error) {
    console.error("Error in createOffer controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOffer = async (req, res) => {
  try {
    const { userId } = req.body;

    const offer = await OfferModel.findOne(userId);
    if (!offer) {
      return res.status(400).json({
        message: "Offer not exist",
        error: true,
      });
    }
    res.status(200).json({
      message: "Request complete Successfully",
      data: offer,
      success: true,
    });
  } catch (error) {
    console.error("Error in getOffer controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllOffers = async (req, res) => {
  try {
    // Fetch all offers from the database
    const offers = await OfferModel.find();
    if (!offers.length) {
      return res.status(404).json({
        message: "No offers found",
        error: true,
      });
    }

    res.status(200).json({
      message: "Offers retrieved successfully",
      data: offers,
      success: true,
    });
  } catch (error) {
    console.error("Error in getAllOffers controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
