


// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// src/lib/supabaseClient.js
// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Add them in Netlify env vars.");
//   // Throwing makes the page show a clearer error rather than a low-level library message:
//   throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Please set environment variables.");
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// src/lib/supabaseClient.js
// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Add them in Netlify env vars.");
//   throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Please set environment variables.");
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);


import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Add them in Netlify env vars.");
  throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Please set environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
