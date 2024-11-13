import UserModel from "../Users/user_module.js";  // Import the User model
import OfferModel from "./offer_module.js";  // Import the Offer model

// Function to create a new offer
export const createOffer = async (req, res) => {
  try {
    // Destructure the incoming request body to get offer details
    const { id, title, description, tags } = req.body;

    // Check if the user exists by searching for the user by ID
    const userExist = await UserModel.findById(id);
    if (!userExist) {
      return res.status(400).json({
        message: "User does not exist",  // If user does not exist, return an error response
        error: true,
      });
    }

    // Create a new offer using the Offer model and the provided data
    const newOffer = new OfferModel({
      userId: id,  // Link the offer to the user by user ID
      title,
      description,
      tags,
    });

    // Save the newly created offer in the database
    await newOffer.save();

    // Return a successful response with the created offer data
    return res.status(201).json({
      message: "Offer created successfully",  // Successful creation message
      data: newOffer,
      success: true,
    });
  } catch (error) {
    console.error("Error in createOffer controller", error.message);  // Log the error
    return res.status(500).json({ error: "Internal Server Error" });  // Return server error
  }
};

// Function to get a specific offer by user ID
export const getOffer = async (req, res) => {
  try {
    const { userId } = req.body;  // Get the user ID from the request body

    // Find the offer using the provided user ID
    const offer = await OfferModel.findOne(userId);
    if (!offer) {
      return res.status(400).json({
        message: "Offer not exist",  // If no offer is found, return an error response
        error: true,
      });
    }

    // Return a successful response with the found offer
    res.status(200).json({
      message: "Request complete successfully",  // Successful retrieval message
      data: offer,
      success: true,
    });
  } catch (error) {
    console.error("Error in getOffer controller", error.message);  // Log the error
    return res.status(500).json({ error: "Internal Server Error" });  // Return server error
  }
};

// Function to get all offers from the database
export const getAllOffers = async (req, res) => {
  try {
    // Fetch all offers from the database
    const offers = await OfferModel.find();
    if (!offers.length) {
      return res.status(404).json({
        message: "No offers found",  // If no offers are found, return a not found response
        error: true,
      });
    }

    // Return a successful response with all the offers
    res.status(200).json({
      message: "Offers retrieved successfully",  // Successful retrieval message
      data: offers,
      success: true,
    });
  } catch (error) {
    console.error("Error in getAllOffers controller", error.message);  // Log the error
    return res.status(500).json({ error: "Internal Server Error" });  // Return server error
  }
};
