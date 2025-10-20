import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  steps: { type: [String], default: [] },
});

export default mongoose.model("Recipe", recipeSchema);
