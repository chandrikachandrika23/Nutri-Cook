import mongoose from "mongoose";
import dotenv from "dotenv";
import Food from "./models/Food.js";
import Recipe from "./models/Recipe.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected..."))
.catch(err => console.error(err));

// Sample foods
const foods = [
  { name: "biryani_chicken", calories: 300 },
  { name: "egg_fry", calories: 200 },
  { name: "noodles", calories: 350 },
  { name: "potatoes", calories: 150 },
  { name: "grilled_chicken", calories: 250 },
  { name: "mutton", calories: 400 },
  { name: "dal", calories: 180 },
];

// Sample recipes
const recipes = [
  {
    food: "biryani_chicken",
    steps: [
      "Marinate chicken with spices.",
      "Cook basmati rice separately.",
      "Layer rice and chicken, cook on low heat.",
      "Serve hot with raita."
    ]
  },
  {
    food: "egg_fry",
    steps: ["Heat oil, fry eggs.", "Serve hot."]
  },
  {
    food: "dal",
    steps: ["Boil lentils.", "Prepare tempering and mix.", "Serve hot with rice."]
  },
];

const seedDB = async () => {
  try {
    await Food.deleteMany({});
    await Recipe.deleteMany({});

    await Food.insertMany(foods);
    console.log("Foods seeded");

    await Recipe.insertMany(recipes);
    console.log("Recipes seeded");

    console.log("Database seeding completed!");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
