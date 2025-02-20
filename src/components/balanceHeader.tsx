import { Alert, Animated, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRef } from "react";
import { useLoading } from "../context/LoadingContext";
import { useUser } from "../context/UserContext";
import { useModal } from "../context/ModalContext";
import { supabase } from "../api/supabase";

export default function BalanceHeader() {
  const { setIsLoading } = useLoading();
  const { user } = useUser();
  const { setIsModal } = useModal();

  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scale, {
      toValue: 1.2,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const logOut = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert(error.message);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logOut}>
        <MaterialCommunityIcons name="logout" size={26} color="black" />
      </TouchableOpacity>
      {user ?
        <>
          <Pressable
            onPress={() => { setIsModal(true) }}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Animated.View style={{ flexDirection: 'row', transform: [{ scale }] }}>
              <Text style={styles.balance_text}>Balance</Text>
              <Text style={styles.amount_text}>{'S/ ' + user.balance.toFixed(2)}</Text>
            </Animated.View>
          </Pressable>
          <Pressable>
            {/*<MaterialCommunityIcons name="face-man-outline" size={30} color="black" />*/}
            {user.name && <Text>{user.name}</Text>}
          </Pressable>

        </> :
        <View>{/*Skeletons*/}</View>}
    </View >
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    height: 50,
  },
  balance_text: {
    color: '#00DC95',
    fontSize: 20,
    marginHorizontal: 5,
    fontWeight: 'bold'
  },
  amount_text: {
    fontSize: 20,
    marginHorizontal: 5,
    fontWeight: 'semibold'
  },
})
