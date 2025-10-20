import { useNavigate } from "react-router-dom";
import './home.css';

export default function Home() {
  const navigate = useNavigate();

  // Direct Unsplash image URL for hero section
  const heroImage = "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80";

  return (
    <div className="home-container">
      <header className="home-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="overlay">
          <h1>🍳 Welcome to NutriCook</h1>
          <p>Your personalized recipe recommender & cooking guide.</p>
          <button onClick={() => navigate("/preferences")}>Get Started</button>
        </div>
      </header>

      <section className="features-section">
        <h2>Why NutriCook?</h2>
        <div className="features-cards">
          <div className="card">
            <h3>Personalized Recipes👩‍🍳🥗🍛</h3>
            <p>Recipes tailored to your health and taste preferences.</p>
          </div>
          <div className="card">
            <h3>Health First💪🍎🏃‍♀️</h3>
            <p>See which foods are suitable or not based on your conditions.</p>
          </div>
          <div className="card">
            <h3>Step-by-Step Cooking🍳📋</h3>
            <p>Clear cooking instructions for each recipe.</p>
          </div>
          <div className="card">
            <h3>Quick & Easy⚡⏱👌</h3>
            <p>Save time with simple and nutritious meals.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
