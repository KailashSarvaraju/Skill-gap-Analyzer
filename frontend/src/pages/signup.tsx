import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/api";

import "./signup.css";

export default function Signup() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSignup = async () => {

    // VALIDATION
    if (
      !username ||
      !email ||
      !password
    ) {

      alert("Please fill all fields");

      return;
    }

    try {

      setLoading(true);

      const response = await API.post(
        "/signup",
        {
          username,
          email,
          password
        }
      );

      alert(response.data.message);

      // CLEAR INPUTS
      setUsername("");

      setEmail("");

      setPassword("");

      // REDIRECT
      navigate("/login");

    } catch (error: any) {

      console.log(error);

      alert(
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Signup failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="signup-container">

      <div className="signup-card">

        <h1 className="signup-title">
          Create Account 🚀
        </h1>

        <p className="signup-subtitle">
          Join SkillForge and level up your career
        </p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="signup-input"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="signup-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="signup-input"
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="signup-btn"
        >
          {
            loading
              ? "Creating Account..."
              : "Signup"
          }
        </button>

        <div className="signup-footer">

          Already have an account?

          {" "}

          <span
            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </span>

        </div>

      </div>

    </div>
  );
}