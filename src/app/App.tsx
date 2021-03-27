import React from "react";
import useInput from "./hooks/useInput";
// import "./App.css";
import useArray from "./hooks/useArray";

const App = () => {
  const [todo, setTodo, resetTodo] = useInput("");
  const todos = useArray([]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (todo === "") return;
    todos.addItem(todo);
    resetTodo();
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <label htmlFor="todo">Todo text</label>
        <br />
        <input
          id="todo"
          className="todo-input"
          onChange={setTodo}
          value={todo}
        />
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
      <div>
        <ul>
          {todos.list.map((todo) => (
            <li key={todo.id}>
              <span
                className={todo.completed ? "todo-completed" : undefined}
                onClick={() => todos.toggleItem(todo.id)}
              >
                {todo.text}
              </span>
              <span
                className="delete-btn"
                onClick={() => todos.removeItem(todo.id)}
              >
                x
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
