import express from "express";
import Food from "../models/Food.js";
import UserPreference from "../models/UserPreference.js";

const router = express.Router();

// Fetch suitable food recommendations
router.post("/", async (req, res) => {
  try {
    const { userId, conditions, preferredFood } = req.body;

    // Validate user input
    if (!userId && (!conditions || !preferredFood)) {
      return res.status(400).json({ message: "Missing userId or preferences" });
    }

    // Fetch user's preferences if not provided directly
    let userConditions = conditions;
    let userPreferredFoods = preferredFood;

    if (!conditions || !preferredFood) {
      const pref = await UserPreference.findOne({ userId });
      if (!pref) {
        return res.status(404).json({ message: "User preferences not found" });
      }
      userConditions = pref.conditions;
      userPreferredFoods = pref.preferredFood;
    }

    // Fetch foods matching preferred foods
    const foods = await Food.find({ name: { $in: userPreferredFoods } });

    // Separate suitable vs not suitable foods
    const suitable = [];
    const notSuitable = [];

    foods.forEach((food) => {
      // Find which user conditions make this food unsafe
      const unsafeConditions = food.notSuitableFor.filter((cond) =>
        userConditions.includes(cond)
      );

      if (unsafeConditions.length > 0) {
        notSuitable.push({
          name: food.name,
          unsafeConditions,
          recipeSteps: food.recipeSteps,
        });
      } else {
        suitable.push({
          name: food.name,
          recipeSteps: food.recipeSteps,
        });
      }
    });

    res.json({ suitable, notSuitable });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating recommendations" });
  }
});

export default router;
