"use client";
import React, { useState, useEffect } from "react";
import "../styles/components/Pomodoro.css";

function Pomodoro() {
  const [seconds, setSeconds] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let timer;
    if (isRunning && seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else if (isRunning && seconds === 0) {
      setSessions(sessions + 1);
      setIsRunning(false);
      setSeconds(1500);
    }
    return () => clearTimeout(timer);
  }, [isRunning, seconds]);

  return (
    <div className="container pomodoro">
      <h2>Pomodoro Timer</h2>
      <h3>
        {Math.floor(seconds / 60)}:{("0" + (seconds % 60)).slice(-2)}
      </h3>
      <div className="pomodoro-controls">
        <button onClick={() => setIsRunning(true)}>Start</button>
        <button onClick={() => setIsRunning(false)}>Pause</button>
        <button onClick={() => setSeconds(1500)}>Reset</button>
      </div>
      <p>Sessions Completed: {sessions}</p>
    </div>
  );
}

export default Pomodoro;
