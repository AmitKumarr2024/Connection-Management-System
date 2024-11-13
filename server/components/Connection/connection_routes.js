import express from "express";
import {
  createConnection,
  deleteConnection,
  getAllConnections,

  updateConnectionStatus,
} from "./connection_controller.js";

const route = express.Router();

// Create a new connection
route.post("/create", createConnection);



route.get("/all-connection", getAllConnections);

// Update connection status (accept/reject)
route.put("/update-status", updateConnectionStatus);

// Delete a connection
route.delete("/delete/:connectionId", deleteConnection);

export default route;
