import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";

export default function TodoItem(props) {
  const { todo, removeTodo, completeTodo } = props;
  return (
    <div className={todo.is_completed ? "todo-row complete" : "todo-row"}>
      {todo.name}
      <div className="iconsContainer">
        <RiCloseCircleLine
          className="icon"
          onClick={() => removeTodo(todo.id)}
        />
        {!todo.is_completed ? (
          <AiFillCheckCircle onClick={() => completeTodo(todo.id)} />
        ) : null}
      </div>
    </div>
  );
}
