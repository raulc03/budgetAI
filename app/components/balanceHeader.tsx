import { StyleSheet, Text, View } from "react-native";

type Props = {
  amount: string
}

export default function BalanceHeader({ amount }: Props) {
  const display_amount = 'S/ ' + amount
  return (
    <View style={styles.container}>
      <Text style={styles.balance_text}>Balance</Text>
      <Text style={styles.amount_text}>{display_amount}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    height: 50,
  },
  balance_text: {
    color: '#00DC95',
    fontSize: 20,
    marginHorizontal: 5,
    fontWeight: 'semibold'
  },
  amount_text: {
    fontSize: 20,
    marginHorizontal: 5,
    fontWeight: 'semibold'
  }
})
