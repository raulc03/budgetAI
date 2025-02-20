import { useState } from 'react';
import { Alert, AppState, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../api/supabase';

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
})

export default function LoginScreen() {
    const [name, setName] = useState<string>('');
    const [lastName, setLastname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    //TODO: Pasar lógica a archivo destinado para ello
    const onSignIn = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) Alert.alert('Error al iniciar sesión', 'Revise el correo y/o contraseña');
        setLoading(false);
    }

    const registerUser = async (user_id: string | undefined) => {
        const { error } = await supabase.from('users')
            .insert([{
                user_id: user_id,
                name: name,
                lastname: lastName,
                balance: 0
            }]);
        if (error) { Alert.alert('Error en el registro', 'Error al registrar los datos') }
    }

    const onSignUp = async () => {
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) Alert.alert("Error en el registro", 'Revisar el correo y/o contraseña');
        else {
            await registerUser(data.user?.id);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Bienvenido de Vuelta!</Text>
            <TextInput
                style={styles.input}
                autoCapitalize='words'
                inputMode='text'
                onChangeText={setName}
                placeholder='Nombre'
                placeholderTextColor='#666'
                value={name} />
            <TextInput
                style={styles.input}
                autoCapitalize='words'
                inputMode='text'
                onChangeText={setLastname}
                placeholder='Apellido'
                placeholderTextColor='#666'
                value={lastName} />
            <TextInput
                style={styles.input}
                autoCapitalize='none'
                inputMode='email'
                onChangeText={setEmail}
                placeholder='Email'
                placeholderTextColor='#666'
                value={email} />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                placeholder='Password'
                placeholderTextColor='#666'
                secureTextEntry={true}
                value={password} />
            <TouchableOpacity style={styles.button}
                onPress={onSignIn}
                disabled={loading}
            >
                <Text style={{ fontSize: 18, color: '#fff' }}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,
            { backgroundColor: "#111111", marginTop: 0 }]}
                onPress={onSignUp}
                disabled={loading}
            >
                <Text style={{ fontSize: 18, color: '#fff' }}>Registrar</Text>
            </TouchableOpacity>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
    },
    header: {
        fontSize: 20,
        margin: 20,
        fontWeight: 'bold',
    },
    input: {
        width: '60%',
        height: 40,
        borderBottomWidth: 1,
        padding: 10,
        marginVertical: 10,
    },
    button: {
        width: '50%',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#00DC95'
    }
})
