import UserModel from "../Users/user_module.js";  // Import the User model to interact with the user data
import ConnectionModel from "./connection_module.js";  // Import the Connection model to manage connections between users
import mongoose from "mongoose";  // Import mongoose for MongoDB interaction

// Define constants for connection statuses (PENDING, ACCEPTED, REJECTED)
const CONNECTION_STATUS = {
  PENDING: "pending",  // Connection is pending approval
  ACCEPTED: "accepted",  // Connection has been accepted
  REJECTED: "rejected",  // Connection has been rejected
};

// Create a new connection between two users
export const createConnection = async (req, res) => {
  try {
    const { user1, user2, connectionType } = req.body;  // Destructure the users and connection type from the request body

    // Find the users in the database by their _id field
    const userExist1 = await UserModel.findOne({ _id: user1 });
    const userExist2 = await UserModel.findOne({ _id: user2 });

    // If either user does not exist, send an error response
    if (!userExist1 || !userExist2) {
      return res
        .status(400)
        .json({ message: "One or both users do not exist", error: true });
    }

    // Create a new connection with the users' _ids and the connection type, set the default status as "pending"
    const newConnection = new ConnectionModel({
      user1: userExist1._id,
      user2: userExist2._id,
      connectionType,
      status: "pending",
    });

    // Save the new connection to the database
    await newConnection.save();

    // Return success response with the newly created connection
    return res.status(201).json({
      message: "Connection created successfully",
      data: newConnection,
      success: true,
    });
  } catch (error) {
    // Handle any errors that occur during connection creation
    console.error("Error in createConnection controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update the status of an existing connection (accept or reject)
export const updateConnectionStatus = async (req, res) => {
  try {
    const { connectionId, status } = req.body;  // Destructure the connectionId and status from the request body

    // If the status is invalid, return an error response
    if (!Object.values(CONNECTION_STATUS).includes(status)) {
      return res.status(400).json({ message: "Invalid status", error: true });
    }

    // Find the connection by its ID
    const connection = await ConnectionModel.findById(connectionId);
    if (!connection) {
      // If the connection is not found, return an error response
      return res
        .status(404)
        .json({ message: "Connection not found", error: true });
    }

    // Update the connection's status
    connection.status = status;
    await connection.save();  // Save the updated connection

    // Return success response with the updated connection data
    return res.status(200).json({
      message: "Connection status updated",
      data: connection,
      success: true,
    });
  } catch (error) {
    // Handle any errors that occur during status update
    console.error("Error in updateConnectionStatus controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all connections in the system
export const getAllConnections = async (req, res) => {
  try {
    // Fetch all connections from the database and populate user data (fullName and email) for both users in each connection
    const connections = await ConnectionModel.find().populate(
      "user1 user2",
      "fullName email"
    );

    // If no connections are found, return an error response
    if (connections.length === 0) {
      return res
        .status(404)
        .json({ message: "No connections found", error: true });
    }

    // Return success response with all connections data
    res.status(200).json({
      message: "All connections fetched successfully",
      data: connections,
      success: true,
    });
  } catch (error) {
    // Handle any errors that occur during fetching connections
    console.error("Error in getAllConnections controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a connection
export const deleteConnection = async (req, res) => {
  try {
    const { connectionId } = req.params;  // Get the connectionId from the URL parameters

    // Find and delete the connection by its ID
    const connection = await ConnectionModel.findByIdAndDelete(connectionId);
    if (!connection) {
      // If the connection is not found, return an error response
      return res
        .status(404)
        .json({ message: "Connection not found", error: true });
    }

    // Return success response after deleting the connection
    return res.status(200).json({
      message: "Connection deleted successfully",
      success: true,
    });
  } catch (error) {
    // Handle any errors that occur during connection deletion
    console.error("Error in deleteConnection controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
