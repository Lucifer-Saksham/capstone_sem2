"use client";

import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "../styles/components/Home.css";

function Home() {
  const [authMode, setAuthMode] = useState(null);
  const [user, setUser] = useState(null);

  const handleSignIn = (userData) => {
    setUser(userData);
    setAuthMode(null);
  };

  const handleSignUp = (userData) => {
    setUser(userData);
    setAuthMode(null);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const showSignIn = () => setAuthMode("signin");
  const showSignUp = () => setAuthMode("signup");
  const hideAuth = () => setAuthMode(null);

  if (!user && authMode) {
    if (authMode === "signin") {
      return <SignIn onSignIn={handleSignIn} onSwitchToSignUp={showSignUp} />;
    }
    if (authMode === "signup") {
      return <SignUp onSignUp={handleSignUp} onSwitchToSignIn={showSignIn} />;
    }
  }

  return (
    <div className="container">
      <div className="header-section">
        <h1>Welcome to TimeNest</h1>
        <p>Your simple time management app.</p>

        {user ? (
          <div className="user-section">
            <p className="welcome-message">
              Welcome back, {user.name || user.email}!
            </p>
            <button onClick={handleSignOut} className="sign-out-button">
              Sign Out
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <button onClick={showSignIn} className="auth-btn signin-btn">
              Sign In
            </button>
            <button onClick={showSignUp} className="auth-btn signup-btn">
              Sign Up
            </button>
          </div>
        )}
      </div>

      <div className="feature-list">
        <div className="feature-item">
          <h3>Pomodoro Timer</h3>
          <p>Stay focused with timed work sessions</p>
        </div>
        <div className="feature-item">
          <h3>To-Do List</h3>
          <p>Organize your tasks efficiently</p>
        </div>
        <div className="feature-item">
          <h3>Daily Planner</h3>
          <p>Plan your day with precision</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
