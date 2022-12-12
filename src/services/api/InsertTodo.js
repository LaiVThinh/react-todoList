import { supabase } from "../../config/supabase";

import React from "react";

const InsertTodo = async ({ name, desc }) => {
  const { data, error } = await supabase
    .from("todo")
    .insert([{ name: name, description: desc }]);
  if (!!error)
    return {
      code: error.code,
      message: error.message,
    };
  return {
    data,
  };
};

export default InsertTodo;
