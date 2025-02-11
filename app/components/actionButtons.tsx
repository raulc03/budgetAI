import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ActionButtons() {
  const onPressButton = (text: string) => {
    alert("Apretaste:  " + text)
  }
  return (
    <View style={styles.container}>
      <Pressable style={styles.itemContainer}
        onPress={() => onPressButton('Gastos')}>
        <Text style={styles.item}>Gastos</Text>
      </Pressable>
      <Pressable style={styles.itemContainer} onPress={() => onPressButton('Ingresos')}>
        <Text style={styles.item}>Ingresos</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 35,
    backgroundColor: '#00DC95',
    borderRadius: 5,
    margin: 10,
  },
  item: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'semibold',
  }
})
