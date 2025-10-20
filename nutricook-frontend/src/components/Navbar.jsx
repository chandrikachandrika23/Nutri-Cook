import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  // Read login status directly from localStorage
  const isLoggedIn = !!localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem("userId"); // remove user login
    navigate("/login"); // redirect to login after logout
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <b>👩‍🍳 NutriCook - Personalized Recipe Recommender & Cooking Guide 🍛</b>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </li>

        {isLoggedIn && (
          <>
            <li>
              <NavLink
                to="/preferences"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Preferences
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/recommendations"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Recommendations
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                🚪 Logout
              </button>
            </li>
          </>
        )}

        {!isLoggedIn && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
