import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Home } from "lucide-react";

import API from "../api/api";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/login", {
        email,
        password,
      });

      console.log(response.data);

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("username", email);

      alert("Login successful");

      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);

      alert(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* 🔙 Back to Home */}
        <Link to="/" className="back-home">
          <Home size={18} />
          <span>Back to Home</span>
        </Link>

        <h1 className="login-title">SkillForge 🚀</h1>

        <p className="login-subtitle">
          Login to continue your journey
        </p>

        {/* EMAIL */}
        <div className="input-group">
          <label className="input-label">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
        </div>

        {/* PASSWORD */}
        <div className="input-group">
          <label className="input-label">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="login-btn"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* SIGNUP LINK */}
        <p className="signup-text">
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link">
            Signup
          </Link>
        </p>

      </div>
    </div>
  );
}