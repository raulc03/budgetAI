import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { supabase } from "../api/supabase";

type Props = {
  amount: string
  username: string | null
}

export default function BalanceHeader({ amount, username }: Props) {
  const display_amount = 'S/ ' + amount

  const refreshSession = async () => {
    await supabase.auth.getSession();
  }

  if (username) {
    refreshSession();
  }

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="menu" size={30} color="black" />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.balance_text}>Balance</Text>
        <Text style={styles.amount_text}>{display_amount}</Text>
      </View>
      <Pressable>
        {/*<MaterialCommunityIcons name="face-man-outline" size={30} color="black" />*/}
        {username && <Text>{username}</Text>}
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
  }
})
