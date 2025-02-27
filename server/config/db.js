import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const connectionString = process.env.DB_URI;

    await mongoose.connect(connectionString, {
      retryWrites: true,
      w: "majority",
    });

    console.log("DB connected successfully");
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }
};

export default connectDB;
