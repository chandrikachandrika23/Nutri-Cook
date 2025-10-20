import Recipe from "../models/Recipe.js";

export const getRecipeByName = async (req, res) => {
  try {
    const foodName = req.params.name.toLowerCase();

    // Try matching name case-insensitively
    const recipe = await Recipe.findOne({
      name: { $regex: new RegExp(`^${foodName}$`, "i") }
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (err) {
    console.error("Error fetching recipe:", err);
    res.status(500).json({ message: "Server error" });
  }
};
