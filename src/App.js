import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { supabase } from "./config/supabase";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import GetAllTodos from "./services/api/GetAllTodos";
import InsertTodo from "./services/api/InsertTodo";
import RemoveTodos from "./services/api/RemoveTodos";
import { findByTestId } from "@testing-library/react";

function App() {
  const [todos, setTodos] = useState([]);
  const [getCount, setGetCount] = useState(0);

  /*
  call api
  thay đổi state
  settimeout - setinterval
  */
  useEffect(() => {
    // side effect
    GetAllTodos()
      .then((res) => {
        if (!!res.code) {
          toast.error(res.message);
          return;
        }

        setTodos(
          res.todoList.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);

            return dateA > dateB ? -1 : 1;
          })
        );
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      })
      .finally(() => {});

    // clean up function - settimeout - setinterval
    // return () => {}

    // dependence - thay doi thi chay side effect
  }, [getCount]);

  const insertTodo = async (text) => {
    InsertTodo({ name: text, desc: text })
      .then((res) => {
        if (!!res.code) {
          toast.error(res.message);
          return;
        }
        setGetCount((current) => {
          return current + 1;
        });

        toast.success("Thêm thành công công việc: " + text);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {});
  };

  const removeTodo = async (id) => {
    // setTodos((curr) => curr.filter((todo) => todo.id !== id));
    RemoveTodos({ id: id })
      .then((res) => {
        if (!!res.code) {
          toast.error(res.message);
          return;
        }
        setGetCount((current) => {
          return current + 1;
        });

        toast.success("Xóa công việc Thành công");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const completeTodo = async (id) => {
    // let updatedTodos = todos.map((todo) => {
    //   if (todo.id === id) {
    //     todo.completed = !todo.completed;
    //   }
    //   return todo;
    // });
    // setTodos(updatedTodos);

    await supabase.from("todo").update({ is_completed: true }).eq("id", id);
    setGetCount(getCount + 1);

    toast.success("Hoàn thành công việc!");
  };

  return (
    <div className="todo-app">
      <ToastContainer />
      <h1>Todo List</h1>

      <TodoForm addTodo={insertTodo} />
      {todos.map((todo) => {
        return (
          <TodoItem
            removeTodo={removeTodo}
            completeTodo={completeTodo}
            todo={todo}
            key={todo.id}
          />
        );
      })}
    </div>
  );
}

export default App;
