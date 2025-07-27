"use client";

import React, { useState } from "react";
import "../styles/components/Auth.css";

function SignIn({ onSignIn, onSwitchToSignUp }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (formData.email && formData.password) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (formData.email.includes("@") && formData.password.length >= 6) {
          onSignIn({ email: formData.email });
        } else {
          setError("Invalid email or password");
        }
      } else {
        setError("Please fill in all fields");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="auth-switch">
          <p>
            Don't have an account?{" "}
            <button onClick={onSwitchToSignUp} className="switch-button">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
