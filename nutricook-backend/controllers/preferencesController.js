import UserPreference from "../models/UserPreference.js";

export const createPreference = async (req, res) => {
  try {
    const pref = new UserPreference(req.body);
    const saved = await pref.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPreference = async (req, res) => {
  try {
    const pref = await UserPreference.findOne({ userId: req.params.userId });
    if (!pref) return res.status(404).json({ message: "Preference not found" });
    res.json(pref);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
