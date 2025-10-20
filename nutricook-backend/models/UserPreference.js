import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  age: Number,
  weight: Number,
  conditions: { type: [String], default: [] }, // health conditions
  preferredFood: { type: [String], default: [] },
  preferredCuisine: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("UserPreference", preferenceSchema);
