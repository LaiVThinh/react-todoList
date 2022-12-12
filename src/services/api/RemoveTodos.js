import React from "react";
import { supabase } from "../../config/supabase";

const RemoveTodos = async ({ id }) => {
  const { data, error } = await supabase.from("todo").delete().eq("id", id);

  if (!!error)
    return {
      code: error.code,
      message: error.message,
    };

  return {
    data,
  };
};

export default RemoveTodos;
