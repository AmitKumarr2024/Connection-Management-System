import mongoose from "mongoose";

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("MongoDb connected Successfully");
  } catch (error) {
    console.log("Error in Connecting to MongoDb:", error);
  }
};

export default connectToMongoDb;
