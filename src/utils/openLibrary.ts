import * as ImagePicker from 'expo-image-picker';
import classifyTransaccion from '../api/transactionRecognizer';
import { supabase } from '../api/supabase';

const mockResponse = {
    p_category_name: 'Transporte',
    p_type: 'EXPENSE',
    p_amount: 100.50,
    p_date: '2024-02-12',
    p_time: '14:30:00',
    p_detail: 'Taxi al trabajo'
}

const registerExpsenseIncome = async (user_id: number) => {
    try {
        //const apiResult = await classifyTransaccion(result.assets[0].uri);
        //TODO: Llamar a API de Sonnet 
        const { data, error } = await supabase.rpc('insert_expense_income',
            { ...mockResponse, p_user_id: user_id });
        if (error) {
            console.error("Error al insertar el registro:", error);
        } else {
            console.log("Registro insertado con ID:", data);
        }
    } catch (error) {
        console.error("Error al enviar la imagen:", error);
    }
}

export default async function pickImage(user_id: number) {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
    });

    if (!result.canceled) {
        await registerExpsenseIncome(user_id);

    }
};
