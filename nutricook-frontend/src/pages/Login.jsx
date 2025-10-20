import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
  localStorage.setItem("userId", data.userId); // store immediately
  navigate("/preferences"); // redirect immediately after storing
}


    //   if (response.ok) {
    //     alert("Login successful!");
    //     localStorage.setItem("userId", data.userId);
    //     navigate("/preferences");
    //   }
       else {
        // Show detailed error from server
        alert(data.message || "Invalid credentials");
        console.error("Login failed:", data);
      }
    } catch (error) {
      alert("Error connecting to server");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>🔐 Welcome Back</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>
        New to NutriCook?{" "}
        <span className="link" onClick={() => navigate("/register")}>
          Register
        </span>
      </p>
    </div>
  );
}

export default Login;
