import { useState } from 'react';
import { Alert, AppState, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase } from '../api/supabase';

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
})

export default function LoginScreen() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Bienvenido de Vuelta!</Text>
            <TextInput
                style={styles.input}
                inputMode='email'
                onChangeText={setEmail}
                placeholder='Email'
                value={email} />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                placeholder='Password'
                secureTextEntry={true}
                value={password} />
            <Pressable style={styles.button}
                onPress={onSubmit}
                disabled={loading}
            >
                <Text>Iniciar sesión</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 20,
        margin: 20,
        fontWeight: 'bold',
    },
    input: {
        width: '60%',
        height: 40,
        borderWidth: 1,
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
