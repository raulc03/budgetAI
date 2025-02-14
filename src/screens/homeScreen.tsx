import BalanceHeader from "../components/balanceHeader";
import DetailView from "../components/detailView";
import AddButton from "../components/addButon";
import { PostgrestSingleResponse, Session } from "@supabase/supabase-js";
import pickImage from "../utils/openLibrary";
import { useEffect, useState } from "react";
import User from "../types/user";
import { supabase } from "../api/supabase";
import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Loading from "../components/loading"; import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
    session: Session;
}

export default function HomeScreen({ session }: Props) {
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [balance, setBalance] = useState<string>('');

    useEffect(() => {
        if (session) getUser();
    }, [session])

    const getUser = async () => {
        try {
            setLoading(true);
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
        } finally {
            setLoading(false);
        }
    }

    const logOut = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        if (error) Alert.alert(error.message);
        setLoading(false);
    };

    const updateBalance = async () => {
        const { data, error } = await supabase
            .from('users')
            .update({ balance: balance })
            .eq('user_id', user?.user_id)
            .select('*').single() as PostgrestSingleResponse<User>;

        if (error) {
            Alert.alert("Error al actualizar balance", error.message);
        } else {
            if (data && user?.balance.toString() !== balance) {
                setUser({ ...data });
            }
        }
        setModalVisible(false);
    }

    return !loading && user ? (
        <>
            <View style={styles.container}>
                <BalanceHeader user={{ name: user.name, amount: user.balance }}
                    logOut={logOut}
                    setModalVisible={setModalVisible} />
                <DetailView user_id={user.user_id} />
                <AddButton handlyClassify={() => pickImage(user.user_id)} />
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(!isModalVisible)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(!isModalVisible)}>
                    <View style={styles.backdrop}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalMessage}>
                                    Modifica tu Balance!
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="numeric"
                                        value={balance}
                                        onChangeText={setBalance}
                                        placeholder="0.00"
                                        autoFocus={true}
                                        caretHidden
                                    />
                                    <TouchableOpacity onPress={updateBalance}>
                                        <MaterialIcons name="check-circle" size={35} color="#111111" />
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    ) : <Loading />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingTop: 15,
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 300,
    },
    modalMessage: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 15,
    },
    input: {
        flex: 3,
        fontSize: 20,
        borderBottomWidth: 1,
        textAlign: 'center',
        marginRight: 10,
    },
})
