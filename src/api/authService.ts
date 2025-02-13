import { SupabaseClient } from "@supabase/supabase-js"

export const signUp = async (supabase: SupabaseClient, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    })
    if (error) {
        console.error("Ocurrió un error al registrar nuevo usuario:", error);
        throw error;
    }
    return data;
};

export const signIn = async (supabase: SupabaseClient, email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
};
