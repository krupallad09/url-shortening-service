import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL_CONNECTION, {});
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectToMongoDB;
