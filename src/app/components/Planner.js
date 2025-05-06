"use client";
import React, { useState } from "react";
import "../styles/components/Planner.css";

function Planner() {
  const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const [notes, setNotes] = useState({});

  const handleChange = (hour, value) => {
    setNotes({ ...notes, [hour]: value });
  };

  return (
    <div className="container">
      <h2>Daily Planner</h2>
      <div className="planner-list">
        {hours.map((hour) => (
          <div key={hour} className="planner-item">
            <strong>{hour}:00</strong>
            <input
              type="text"
              value={notes[hour] || ""}
              onChange={(e) => handleChange(hour, e.target.value)}
              placeholder="Enter your plan"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Planner;
