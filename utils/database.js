import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
        });
        isConnected = true;
        console.log('MongoDB connected');
    } catch (error) {
        isConnected = false; // Reset isConnected flag on connection failure
        console.error('MongoDB connection error:', error);
        throw new Error('Failed to connect to MongoDB'); // Throw an error to indicate connection failure
    }
};