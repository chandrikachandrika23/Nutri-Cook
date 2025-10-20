// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const userId = localStorage.getItem("userId"); // match what you store on login
  if (!userId) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
