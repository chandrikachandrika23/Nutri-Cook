import express from "express";
import UserPreference from "../models/UserPreference.js";

const router = express.Router();

// Add new preference
router.post("/", async (req, res) => {
  const pref = new UserPreference(req.body);
  try {
    const newPref = await pref.save();
    res.status(201).json(newPref);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all preferences (optional)
router.get("/", async (req, res) => {
  try {
    const prefs = await UserPreference.find();
    res.json(prefs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
