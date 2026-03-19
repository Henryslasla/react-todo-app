import React, { useEffect, useState } from "react";

function TodoApp() {
  // Initialize todos from localStorage (runs once on load)
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed
  // Add new todo (ignore empty input)
  const handleAddTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };
  // Remove a todo
  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  // Toggle completed state
  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    setTodos(updatedTodos);
  };

  // Apply filter (all / active / completed)
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <div>
      <h1>Todo List</h1>
      <input
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddTodo();
        }}
        placeholder='What needs to be done?'
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
      <p>
        Showing {filteredTodos.length} {filter} todo(s) || Active: {todos.filter((t) => !t.completed).length} || Completed:{" "}
        {todos.filter((t) => t.completed).length}
      </p>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input type='checkbox' checked={todo.completed} onChange={() => handleToggleComplete(todo.id)} />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#999" : "#000",
                margin: "0 10px",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
