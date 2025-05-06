"use client";
import React, { useState, useRef } from "react";
import "../styles/Todo.css";

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
      <input ref={inputRef} type="text" placeholder="Enter task" />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task, i) => (
          <li key={i} className="todo">
            {task} <button onClick={() => deleteTask(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
