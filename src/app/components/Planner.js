"use client";
import React, { useState, useEffect } from "react";
import "../styles/components/Planner.css";

function Planner() {
  const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const [notes, setNotes] = useState({});
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [calendarId, setCalendarId] = useState("primary");
  const [isConnected, setIsConnected] = useState(false);

  const GOOGLE_CALENDAR_API = "https://www.googleapis.com/calendar/v3";

  const fetchEvents = async () => {
    if (!apiKey) return;

    setLoading(true);

    try {
      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
      );

      const response = await fetch(
        `${GOOGLE_CALENDAR_API}/calendars/${calendarId}/events?` +
          `timeMin=${startOfDay.toISOString()}&` +
          `timeMax=${endOfDay.toISOString()}&` +
          `singleEvents=true&` +
          `orderBy=startTime&` +
          `key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const eventsByHour = {};
      data.items.forEach((event) => {
        const startTime = new Date(event.start.dateTime || event.start.date);
        const hour = startTime.getHours();
        if (hours.includes(hour)) {
          if (!eventsByHour[hour]) {
            eventsByHour[hour] = [];
          }
          eventsByHour[hour].push({
            id: event.id,
            summary: event.summary,
            startTime: startTime,
            endTime: new Date(event.end.dateTime || event.end.date),
          });
        }
      });

      setEvents(eventsByHour);
      setIsConnected(true);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (hour, summary) => {
    if (!apiKey || !summary.trim()) return;

    setLoading(true);

    try {
      const today = new Date();
      const startTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hour
      );
      const endTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hour + 1
      );

      const eventData = {
        summary: summary,
        start: {
          dateTime: startTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      };

      const response = await fetch(
        `${GOOGLE_CALENDAR_API}/calendars/${calendarId}/events?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newEvent = await response.json();

      if (!events[hour]) {
        events[hour] = [];
      }
      events[hour].push({
        id: newEvent.id,
        summary: newEvent.summary,
        startTime: startTime,
        endTime: endTime,
      });
      setEvents({ ...events });

      setNotes({ ...notes, [hour]: "" });
    } catch (error) {
      console.error("Error adding event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (hour, value) => {
    setNotes({ ...notes, [hour]: value });
  };

  const handleKeyPress = (e, hour) => {
    if (e.key === "Enter") {
      addEvent(hour, notes[hour]);
    }
  };

  const connectToCalendar = () => {
    if (apiKey.trim()) {
      fetchEvents();
    }
  };

  return (
    <div className="container">
      <h2>Daily Planner with Google Calendar</h2>

      <div className="calendar-connection">
        <h3>Connect to Google Calendar</h3>
        <p>
          Get your API key from{" "}
          <a
            href="https://console.cloud.google.com/apis/credentials"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Cloud Console
          </a>
        </p>
        <div className="api-inputs">
          <input
            type="password"
            placeholder="Enter Google Calendar API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="api-key-input"
          />
          <input
            type="text"
            placeholder="Calendar ID (default: primary)"
            value={calendarId}
            onChange={(e) => setCalendarId(e.target.value)}
            className="calendar-id-input"
          />
          <button onClick={connectToCalendar} disabled={loading}>
            {loading ? "Connecting..." : "Connect"}
          </button>
        </div>
        {isConnected && (
          <p className="success-message">✅ Connected to Google Calendar!</p>
        )}
      </div>

      <div className="planner-list">
        {hours.map((hour) => (
          <div key={hour} className="planner-item">
            <div className="time-slot">
              <strong>{hour}:00</strong>
            </div>

            <div className="calendar-events">
              {events[hour] &&
                events[hour].map((event) => (
                  <div key={event.id} className="calendar-event">
                    <span className="event-title">{event.summary}</span>
                    <span className="event-time">
                      {event.startTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -
                      {event.endTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
            </div>

            <div className="add-event">
              <input
                type="text"
                value={notes[hour] || ""}
                onChange={(e) => handleChange(hour, e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, hour)}
                placeholder="Add event to Google Calendar"
                disabled={!isConnected || loading}
              />
              <button
                onClick={() => addEvent(hour, notes[hour])}
                disabled={!isConnected || loading || !notes[hour]?.trim()}
                className="add-event-btn"
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {isConnected && (
        <div className="refresh-section">
          <button
            onClick={fetchEvents}
            disabled={loading}
            className="refresh-btn"
          >
            {loading ? "Refreshing..." : "Refresh Calendar"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Planner;
