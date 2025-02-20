import { Alert } from "react-native";
import User from "../types/user";
import { supabase } from "./supabase";
import { userCategoryResponse } from "../types/category";
import { PostgrestSingleResponse, Session } from "@supabase/supabase-js";

type Params = {
    user: User | null;
    userCategoryList: userCategoryResponse[];
    setUserCategoryList: (categories: userCategoryResponse[]) => void;
}

export const getUser = async (session: Session, setUser: (user: User) => void) => {
    try {
        if (!session?.user) {
            await supabase.auth.signOut();
            throw new Error('No existe usuario en la sessión!');
        }

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('user_id', session?.user.id)
            .single() as PostgrestSingleResponse<User>;

        if (error) {
            await supabase.auth.signOut();
            Alert.alert("Error al identificar", error.message)
        }
        if (data) {
            setUser(data);
        }
    } catch (error) {
        if (error instanceof Error) {
            Alert.alert(error.message);
        }
    }
}

export const getUserCategories = async ({
    user, userCategoryList, setUserCategoryList }: Params) => {
    if (user) {
        const { data, error } = await supabase.rpc('get_user_category_totals', {
            p_user_id: user?.user_id,
        });
        if (error) {
            Alert.alert("Error al obtener categorías", error.message);
        }
        else {
            if (JSON.stringify(data) !== JSON.stringify(userCategoryList)) {
                setUserCategoryList(data);
            }
        }
    };
};


//TODO: Borrar cuando se implemente el API del modelo de lenguaje
const mockResponse = {
    p_category_name: 'Transporte',
    p_type: 'EXPENSE',
    p_amount: 100.50,
    p_date: '2024-02-12',
    p_time: '14:30:00',
    p_detail: 'Taxi al trabajo'
}

export const registerExpenseOrIncome = async (imgUri: string, user_id: number) => {
    try {
        //const apiResult = await classifyTransaccion(imgUri);
        //TODO: Llamar a API de Sonnet 
        const { data, error } = await supabase.rpc('insert_expense_income',
            { ...mockResponse, p_user_id: user_id });
        if (error) {
            console.error("Error al insertar el registro:", error);
        } else {
            console.log("Registro insertado con ID:", data);
            return data;
        }
    } catch (error) {
        console.error("Error al enviar la imagen:", error);
    }
    return null;
}
