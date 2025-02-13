import { SUPABASE_KEY, SUPABASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = SUPABASE_URL;
const supapbaseKey = SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supapbaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    }
});

