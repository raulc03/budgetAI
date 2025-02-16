import { MaterialIcons } from "@expo/vector-icons";
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useModal } from "../context/ModalContext";
import { supabase } from "../api/supabase";
import { useUser } from "../context/UserContext";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import User from "../types/user";
import { useEffect, useState } from "react";

export default function ModalBalance() {
  const { user } = useUser();
  const { isModal, setIsModal } = useModal();
  const [balance, setBalance] = useState<string>('');
  const [placeHolderBalance, setPlaceHolderBalance] = useState<string>('');

  useEffect(() => {
    if (user) {
      setBalance('');
      setPlaceHolderBalance(user.balance.toFixed(2));
    }
  }, [user])

  const updateBalance = async () => {
    //TODO: Forzar "balance" ser un string con valor numerico a 2 decimales siempre
    if (user?.balance.toFixed(2) !== balance) {
      const { data, error } = await supabase
        .from('users')
        .update({ balance: balance })
        .eq('user_id', user?.user_id)
        .select('*').single() as PostgrestSingleResponse<User>;

      if (error) {
        Alert.alert("Error al actualizar balance", error.message);
      }
    }
    setIsModal(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModal}
      onRequestClose={() => setIsModal(!isModal)}
    >
      <TouchableWithoutFeedback onPress={() => setIsModal(!isModal)}>
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
                  placeholder={placeHolderBalance}
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
  );
}

const styles = StyleSheet.create({
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
