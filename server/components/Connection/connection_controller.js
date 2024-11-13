import UserModel from "../Users/user_module.js";
import ConnectionModel from "./connection_module.js";
import mongoose from "mongoose";

// Define constants for connection statuses
const CONNECTION_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
};

// Create a new connection between two users
export const createConnection = async (req, res) => {
  try {
    const { user1, user2, connectionType } = req.body;
   

    // Find users by their _id field
    const userExist1 = await UserModel.findOne({ _id: user1 });
    const userExist2 = await UserModel.findOne({ _id: user2 });

    if (!userExist1 || !userExist2) {
      return res
        .status(400)
        .json({ message: "One or both users do not exist", error: true });
    }

    const newConnection = new ConnectionModel({
      user1: userExist1._id, // Use _id for the connection
      user2: userExist2._id, // Use _id for the connection
      connectionType,
      status: "pending", // Default status
    });

    await newConnection.save();

    return res.status(201).json({
      message: "Connection created successfully",
      data: newConnection,
      success: true,
    });
  } catch (error) {
    console.error("Error in createConnection controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update connection status (accept or reject)
export const updateConnectionStatus = async (req, res) => {
  try {
    const { connectionId, status } = req.body;


    if (!Object.values(CONNECTION_STATUS).includes(status)) {
      return res.status(400).json({ message: "Invalid status", error: true });
    }

    const connection = await ConnectionModel.findById(connectionId);
    if (!connection) {
      return res
        .status(404)
        .json({ message: "Connection not found", error: true });
    }

    connection.status = status;
    await connection.save();

    return res.status(200).json({
      message: "Connection status updated",
      data: connection,
      success: true,
    });
  } catch (error) {
    console.error("Error in updateConnectionStatus controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all connections in the system
export const getAllConnections = async (req, res) => {
  try {
    // Fetch all connections without filtering by userId
    const connections = await ConnectionModel.find().populate(
      "user1 user2",
      "fullName email"
    );

    if (connections.length === 0) {
      return res
        .status(404)
        .json({ message: "No connections found", error: true });
    }

    res.status(200).json({
      message: "All connections fetched successfully",
      data: connections,
      success: true,
    });
  } catch (error) {
    console.error("Error in getAllConnections controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a connection
export const deleteConnection = async (req, res) => {
  try {
    const { connectionId } = req.params;

    const connection = await ConnectionModel.findByIdAndDelete(connectionId);
    if (!connection) {
      return res
        .status(404)
        .json({ message: "Connection not found", error: true });
    }

    return res.status(200).json({
      message: "Connection deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in deleteConnection controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
