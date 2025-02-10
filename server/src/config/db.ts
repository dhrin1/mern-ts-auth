import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.log("Failed to connect to database", error);
    process.exit(1);
  }
};

export default connectToDatabase;
