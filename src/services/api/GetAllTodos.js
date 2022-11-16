import { supabase } from "../../config/supabase";

const GetAllTodos = async () => {
  let { data: todo, error } = await supabase.from("todo").select("created_at");

    
};

export default GetAllTodos;
