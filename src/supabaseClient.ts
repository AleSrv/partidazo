import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Lee la URL desde las variables de entorno
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // Lee la clave desde las variables de entorno

export const supabase = createClient(supabaseUrl, supabaseKey);