import mongoose from "mongoose";

// This function connects our backend to the MongoDB Atlas cluster
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        // This log confirms exactly which host we are connected to
        console.log(`MongoDB Connected: ${conn.connection.host} 🌿`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Exit process with failure (1) if connection fails
        process.exit(1);
    }
};

export default connectDB;

