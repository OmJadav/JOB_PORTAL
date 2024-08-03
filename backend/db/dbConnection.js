import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,)
        console.log("Database Connected ✅");
    } catch (err) {
        console.log("Database Connection Failed ❌");
        console.log("Error in Db Connection :: ", err.message);
    }
}