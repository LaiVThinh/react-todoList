import React, { useState } from "react";

export default function TodoForm(props) {
  const { addTodo } = props;
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addTodo(input);
    setInput("");
  };
  return (
    <form onSubmit={handleSubmit} className="todo-form ">
      <input
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
        className="todo-input"
      />

      <button type="submit" className="todo-button">
        Add
      </button>
    </form>
  );
}
