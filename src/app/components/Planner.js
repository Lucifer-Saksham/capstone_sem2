import React, { useState } from 'react';

function Planner() {
  const hours = Array.from({ length: 12 }, (_, i) => i + 9); // 9 to 20
  const [notes, setNotes] = useState({});

  const handleChange = (hour, value) => {
    setNotes({ ...notes, [hour]: value });
  };

  return (
    <div className="container">
      <h2>Daily Planner</h2>
      {hours.map(hour => (
        <div key={hour}>
          <strong>{hour}:00</strong>
          <input
            type="text"
            value={notes[hour] || ''}
            onChange={(e) => handleChange(hour, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}

export default Planner;
