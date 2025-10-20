import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  notSuitableFor: { type: [String], default: [] }, // e.g., diabetes, cholesterol
  recipeSteps: { type: [String], default: [] },
});

export default mongoose.model("Food", foodSchema);
