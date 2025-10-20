// src/pages/Recommendations.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./recommendations.css";

function Recommendations() {
  const location = useLocation();
  const navigate = useNavigate();
// eslint-disable-next-line
  const { age, weight, conditions, preferredFood } = location.state || {};

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({}); // For toggling cooking steps

  useEffect(() => {
    if (!preferredFood || !conditions) {
      alert("Please submit your preferences first!");
      navigate("/preferences");
      return;
    }

    const fetchFoods = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/foods/");
        const data = await res.json();

        // Filter foods by user preferred list
        const filtered = data.filter((food) =>
          preferredFood.includes(food.name.toLowerCase())
        );

        setFoods(filtered);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchFoods();
  }, [preferredFood, conditions, navigate]);

  const toggleSteps = (foodName) => {
    setExpanded((prev) => ({ ...prev, [foodName]: !prev[foodName] }));
  };

  const checkSuitability = (food) => {
    const unsuitable = food.notSuitableFor.filter((cond) =>
      conditions.includes(cond)
    );
    return unsuitable.length > 0
      ? `⚠️ Not Suitable For: ${unsuitable.join(", ")}`
      : "✅ Suitable For Your Health Conditions";
  };

  if (loading)
    return <p className="center-text">Loading your recommended foods...</p>;

  return (
    <div className="recommendations-container">
      <button
        className="back-btn"
        onClick={() => navigate("/preferences")}
      >
        🔙 Back to Preferences
      </button>

      <h2 className="center-text">🍲 Your Recommended Foods</h2>
      {foods.length === 0 && (
        <p className="center-text">No foods match your preferences.</p>
      )}
      <div className="cards-wrapper">
        {foods.map((food) => (
          <div key={food._id} className="food-card">
            <h3>{food.name.charAt(0).toUpperCase() + food.name.slice(1)}</h3>
            <p className="suitability">{checkSuitability(food)}</p>
            <button onClick={() => toggleSteps(food.name)}>
              {expanded[food.name]
                ? "Hide Cooking Steps 🍳"
                : "View Cooking Steps 🍳"}
            </button>
            {expanded[food.name] && (
              <ol className="cooking-steps">
                {food.recipeSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
