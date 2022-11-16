import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ppdvaypfhgfrniiygpvp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZHZheXBmaGdmcm5paXlncHZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg2MDYzOTIsImV4cCI6MTk4NDE4MjM5Mn0.yFJc8QdHHttWJZxC05mAXUhZK5QfiMjtqQhZZ5ShHpQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
