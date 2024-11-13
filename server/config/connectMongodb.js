import mongoose from "mongoose";  // Import mongoose to interact with MongoDB

// Define a function to connect to MongoDB
const connectToMongoDb = async () => {
  try {
    // Attempt to connect to MongoDB using the connection string stored in environment variables
    await mongoose.connect(process.env.MONGODB);  // The connection string is stored in 'process.env.MONGODB'
    console.log("MongoDb connected Successfully");  // If successful, log this message
  } catch (error) {
    // If there is an error during connection, log the error message
    console.log("Error in Connecting to MongoDb:", error);
  }
};

// Export the function so it can be used in other parts of the application
export default connectToMongoDb;
