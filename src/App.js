import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { supabase } from "./config/supabase";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

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

    const getAllTodos = async () => {
      let { data, error } = await supabase.from("todo").select("*");
      if (error) return;
      setTodos(
        data.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);

          return dateA > dateB ? -1 : 1;
        })
      );
    };

    getAllTodos();

    // clean up function - settimeout - setinterval
    // return () => {}

    // dependence - thay doi thi chay side effect
  }, [getCount]);

  const insertTodo = async (text) => {
    await supabase.from("todo").insert([{ name: text, description: text }]);
    setGetCount(getCount + 1);
    toast.success("Thêm công việc thành công!");
  };

  // const addTodo = (text) => {
  //   let id = 1;
  //   if (todos.length > 0) {
  //     id = todos[0].id + 1;
  //   }

  //   let todo = { id: id, text: text, completed: false };
  //   let newTodos = [todo, ...todos];
  //   setTodos(newTodos);
  // };

  const removeTodo = async (id) => {
    // setTodos((curr) => curr.filter((todo) => todo.id !== id));
    await supabase.from("todo").delete().eq("id", id);
    setGetCount(getCount + 1);
    toast.success("Xóa công việc thành công!");
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
