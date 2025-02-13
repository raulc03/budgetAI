import { StyleSheet, Text, View } from "react-native";

export default function TableHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.category}>
        <Text>Categorías</Text>
      </View>
      <View style={styles.amounts}>
        <Text>Plan.</Text>
        <Text>Real</Text>
        <Text>Dif.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  category: {
    flex: 2 / 4,
  },
  amounts: {
    flex: 3 / 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})
