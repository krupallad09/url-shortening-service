import mongoose from "mongoose";
mongoose.set("strictQuery", true);

export async function connectToMongoDB(url) {
    return mongoose.connect(url);
}

export default connectToMongoDB;