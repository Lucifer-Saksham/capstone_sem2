import React from "react";
import "../styles/components/Home.css";

function Home() {
  return (
    <div className="container">
      <h1>Welcome to TimeNest</h1>
      <p>Your simple time management app.</p>
      <div className="feature-list">
        <div className="feature-item">Pomodoro Timer</div>
        <div className="feature-item">To-Do List</div>
        <div className="feature-item">Daily Planner</div>
      </div>
    </div>
  );
}

export default Home;
