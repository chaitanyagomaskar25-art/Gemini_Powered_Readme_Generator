import mongoose from "mongoose";

export const connectBD = async () => {
    console.log("MongoDB connection starting...");
console.log("Production environment:", process.env.NODE_ENV);
console.log("MongoDB URI exists:", !!process.env.MONGO_URI);
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};