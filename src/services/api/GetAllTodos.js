import { supabase } from "../../config/supabase";

const GetAllTodos = async () => {
  let { data: todoData, error } = await supabase.from("todo").select("*");

  if (!!error) {
    return {
      code: error.code,
      message: error.message,
    };
  }

  return {
    todoList: todoData,
  };
};

export default GetAllTodos;
