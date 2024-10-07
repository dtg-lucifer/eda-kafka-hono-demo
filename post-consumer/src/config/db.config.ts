import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://root:rootpassword@localhost:27017/"
    );
    console.log("Connected to MongoDB", conn.connection.host);
  } catch (error) {
    console.log("Error connecting to MongoDB", (error as Error).message);
  }
};
