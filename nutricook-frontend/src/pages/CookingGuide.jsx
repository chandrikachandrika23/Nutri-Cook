import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./cookingGuide.css";

export default function CookingGuide() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/foods");
        const foundRecipe = res.data.find(
          (item) => item.name.toLowerCase() === name.toLowerCase()
        );
        setRecipe(foundRecipe);
      } catch (err) {
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [name]);

  if (loading) return <p style={{ textAlign: "center" }}>🍳 Fetching your personalized recipes...</p>;

  if (!recipe)
    return (
      <div className="cooking-guide-container">
        <h2>❌ Recipe not found for "{name}"</h2>
        <button onClick={() => navigate(-1)}>⬅ Back to Recommendations</button>
      </div>
    );

  return (
    <div className="cooking-guide-container">
      <h1>👩‍🍳 Cooking Guide for {recipe.name}</h1>
      <p><strong>Calories:</strong> {recipe.calories}</p>

      <h2>🍳 Step-by-Step Instructions:</h2>
      <ol>
        {recipe.recipeSteps && recipe.recipeSteps.length > 0 ? (
          recipe.recipeSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))
        ) : (
          <li>No steps available for this recipe.</li>
        )}
      </ol>

      <button onClick={() => navigate(-1)}>⬅ Back to Recommendations</button>
    </div>
  );
}
