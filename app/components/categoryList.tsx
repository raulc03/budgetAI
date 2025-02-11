import { StyleSheet, View } from "react-native";
import TableHeader from "./tableHeader";

export default function CategoryList() {
  return (
    <View style={styles.container}>
      <TableHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  }
})
