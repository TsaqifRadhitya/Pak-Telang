import { createClient } from "@supabase/supabase-js";

export class supabaseService {
    protected supabaseConnection = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
}
