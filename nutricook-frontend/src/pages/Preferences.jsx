import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./preferences.css";

export default function Preferences() {
  const navigate = useNavigate();

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [conditions, setConditions] = useState("");
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [cuisine, setCuisine] = useState("");
  const [customFood, setCustomFood] = useState("");

  // Check if user is logged in
  useEffect(() => {
  const loggedInUserId = localStorage.getItem("userId");
  if (!loggedInUserId) navigate("/login");
}, [navigate]);

  // useEffect(() => {
  //   const loggedInUserId = localStorage.getItem("userId");
  //   if (!loggedInUserId) {
  //     navigate("/login"); // redirect to login if not
  //   }
  // }, [navigate]);

  // Fetch foods from backend
  
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/foods");
        const foodNames = res.data.map((f) => f.name);
        setFoods(foodNames);
        setFilteredFoods(foodNames);
      } catch (err) {
        console.error("Error fetching foods:", err);
      }
    };
    fetchFoods();
  }, []);

  const toggleFood = (food) => {
    setSelectedFoods((prev) =>
      prev.includes(food) ? prev.filter((f) => f !== food) : [...prev, food]
    );
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setFilteredFoods(foods.filter((f) => f.toLowerCase().includes(query)));
  };

  const handleAddCustomFood = (e) => {
    e.preventDefault();
    const foodName = customFood.trim();
    if (foodName && !selectedFoods.includes(foodName)) {
      setSelectedFoods([...selectedFoods, foodName]);
      setCustomFood("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!age || !weight || selectedFoods.length === 0) {
      alert("Please fill Age, Weight, and select at least one food.");
      return;
    }

    const preferenceData = {
      userId: localStorage.getItem("userId"), // use logged-in user
      age: parseInt(age),
      weight: parseInt(weight),
      conditions: conditions
        .split(",")
        .map((c) => c.trim().toLowerCase())
        .filter((c) => c),
      preferredFood: selectedFoods,
      preferredCuisine: cuisine,
    };

    try {
      await axios.post(
        "http://localhost:5000/api/preferences",
        preferenceData
      );
      console.log("Preferences saved:", preferenceData);
      navigate("/recommendations", { state: preferenceData });
    } catch (err) {
      console.error("Error saving preferences:", err);
      alert("Failed to save preferences.");
    }
  };

  return (
    <div className="preferences-container">
      <h1>📝 Your Health & Food Preferences</h1>

      <form className="preferences-form" onSubmit={handleSubmit}>
        <div className="form-card">
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g., 25"
            required
          />
        </div>

        <div className="form-card">
          <label>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g., 60"
            required
          />
        </div>

        <div className="form-card">
          <label>Health Conditions (comma separated):</label>
          <input
            type="text"
            value={conditions}
            onChange={(e) => setConditions(e.target.value)}
            placeholder="e.g., diabetes, hypertension"
          />
        </div>

        <div className="form-card">
          <label>Select Preferred Foods:</label>
          {foods.length === 0 ? (
            <p>Loading available foods...</p>
          ) : (
            <>
              <input
                type="text"
                placeholder="🔍 Search for a food..."
                onChange={handleSearch}
                className="food-search"
              />
              <div className="options-grid">
                {filteredFoods.map((food) => (
                  <button
                    type="button"
                    key={food}
                    className={
                      selectedFoods.includes(food)
                        ? "option selected"
                        : "option"
                    }
                    onClick={() => toggleFood(food)}
                  >
                    {food}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="form-card">
          <label>Add Custom Food:</label>
          <div className="custom-food-row">
            <input
              type="text"
              placeholder="Type a food name..."
              value={customFood}
              onChange={(e) => setCustomFood(e.target.value)}
            />
            <button onClick={handleAddCustomFood} type="button">
              ➕ Add
            </button>
          </div>
        </div>

        <div className="form-card">
          <label>Preferred Cuisine:</label>
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          >
            <option value="">Select Cuisine</option>
            <option value="indian">Indian</option>
            <option value="chinese">Chinese</option>
            <option value="italian">Italian</option>
            <option value="continental">Continental</option>
          </select>
        </div>

        <button type="submit">Get Recommendations 🍲</button>
      </form>
    </div>
  );
}
