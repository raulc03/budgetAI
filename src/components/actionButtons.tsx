import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ActionButtonProps = {
  isExpenseActive: boolean;
  setIsExpenseActive: (value: boolean) => void;
}

export default function ActionButtons({ isExpenseActive, setIsExpenseActive }: ActionButtonProps) {
  const onPressButton = () => {
    setIsExpenseActive(!isExpenseActive);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.itemContainer, isExpenseActive &&
        { backgroundColor: '#111111' }]} onPress={onPressButton}>
        <Text style={styles.item}>Gastos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.itemContainer, !isExpenseActive &&
        { backgroundColor: '#111111' }]} onPress={onPressButton}>
        <Text style={styles.item}>Ingresos</Text>
      </TouchableOpacity>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 16,
    fontWeight: 'semibold',
  }
})
