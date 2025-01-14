import logger from "../../utils/logger.js";
import UserModel from "../Users/user_module.js";
import ConnectionModel from "./connection_module.js";

const CONNECTION_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
};

// Create a connection
export const createConnection = async (req, res) => {
  try {
    const { user1, user2, connectionType } = req.body;

    logger.info(`Creating connection between ${user1} and ${user2}`);

    const userExist1 = await UserModel.findOne({ _id: user1 });
    const userExist2 = await UserModel.findOne({ _id: user2 });

    if (!userExist1 || !userExist2) {
      return res.status(400).json({ message: "Invalid user(s)", error: true });
    }

    const newConnection = new ConnectionModel({
      user1: userExist1._id,
      user2: userExist2._id,
      connectionType,
      status: CONNECTION_STATUS.PENDING,
    });

    await newConnection.save();
    res.status(201).json({ message: "Connection created", data: newConnection, success: true });
  } catch (error) {
    logger.info("Error creating connection:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update connection status
export const updateConnectionStatus = async (req, res) => {
  try {
    const { connectionId, status } = req.body;

    if (!Object.values(CONNECTION_STATUS).includes(status)) {
      return res.status(400).json({ message: "Invalid status", error: true });
    }

    const connection = await ConnectionModel.findById(connectionId);
    if (!connection) {
      return res.status(404).json({ message: "Connection not found", error: true });
    }

    connection.status = status;
    await connection.save();
    res.status(200).json({ message: "Status updated", data: connection, success: true });
  } catch (error) {
    logger.info("Error updating status:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch all connections
export const getAllConnections = async (req, res) => {
  try {
    const connections = await ConnectionModel.find().populate("user1 user2", "fullName email");

    if (!connections.length) {
      return res.status(404).json({ message: "No connections found", error: true });
    }

    res.status(200).json({ message: "Connections fetched", data: connections, success: true });
  } catch (error) {
    logger.info("Error fetching connections:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a connection
export const deleteConnection = async (req, res) => {
  try {
    const { connectionId } = req.params;

    const connection = await ConnectionModel.findByIdAndDelete(connectionId);
    if (!connection) {
      return res.status(404).json({ message: "Connection not found", error: true });
    }

    res.status(200).json({ message: "Connection deleted", success: true });
  } catch (error) {
    logger.info("Error deleting connection:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
