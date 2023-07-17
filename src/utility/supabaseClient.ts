import { createClient } from "@refinedev/supabase";

// const SUPABASE_URL = "https://iwdfzvfqbtokqetmbmbp.supabase.co";
const SUPABASE_URL = "https://feanuyxkmgnifjtifdyi.supabase.co";
// const SUPABASE_KEY =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDU2NzAxMCwiZXhwIjoxOTQ2MTQzMDEwfQ._gr6kXGkQBi9BM9dx5vKaNKYj_DJN1xlkarprGpM_fU";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlYW51eXhrbWduaWZqdGlmZHlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkzMzkyNzMsImV4cCI6MjAwNDkxNTI3M30.Q8QUcbq8edahMsZmeStyiDQxO-QCtud3IFLlt_bVeL8";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
