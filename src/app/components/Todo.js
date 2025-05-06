"use client";
import React, { useState, useRef } from "react";
import "../styles/components/Todo.css";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef();

  const addTask = () => {
    const newTask = inputRef.current.value;
    if (newTask !== "") {
      setTasks([...tasks, newTask]);
      inputRef.current.value = "";
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container">
      <h2>To-Do List</h2>
      <div className="todo-input-container">
        <input ref={inputRef} type="text" placeholder="Enter task" />
        <button onClick={addTask}>Add</button>
      </div>
      <div className="todo-list">
        {tasks.map((task, i) => (
          <div key={i} className="todo-item">
            <span>{task}</span>
            <button onClick={() => deleteTask(i)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
