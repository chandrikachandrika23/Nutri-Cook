import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB Connected:", conn.connection.name); // logs the actual DB name
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
