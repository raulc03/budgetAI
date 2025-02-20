import { StyleSheet, Text, View } from "react-native";

export default function TableHeader() {
  const amount = 'S/ 9,999,999'
  return (
    <View style={styles.container}>
      <View style={styles.category}>
        <Text>Mensual</Text>
      </View>
      <View style={styles.totals}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.total_labels}>Planeado</Text>
          <Text style={styles.total_amounts}>{amount}</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.total_labels}>Real</Text>
          <Text style={styles.total_amounts}>{amount}</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.total_labels}>Diferencia</Text>
          <Text style={styles.total_amounts}>{amount}</Text>
        </View>
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
    flex: 1,
    justifyContent: 'flex-end',
  },
  totals: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  total_labels: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '500'
  },
  total_amounts: {
    fontSize: 13,
  }
})
