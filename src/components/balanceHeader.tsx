import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRef } from "react";

type Props = {
  user: { name: string, amount: number }
  logOut: () => void
  setModalVisible: (visible: boolean) => void
}

export default function BalanceHeader({
  user,
  logOut,
  setModalVisible }: Props) {

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

  return (
    <View style={styles.container}>
      <Pressable onPress={logOut}>
        <MaterialCommunityIcons name="logout" size={26} color="black" />
      </Pressable>
      <Pressable
        onPress={() => { setModalVisible(true) }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={{ flexDirection: 'row', transform: [{ scale }] }}>
          <Text style={styles.balance_text}>Balance</Text>
          <Text style={styles.amount_text}>{'S/ ' + user.amount.toFixed(2)}</Text>
        </Animated.View>
      </Pressable>
      <Pressable>
        {/*<MaterialCommunityIcons name="face-man-outline" size={30} color="black" />*/}
        {user.name && <Text>{user.name}</Text>}
      </Pressable>
    </View>
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
