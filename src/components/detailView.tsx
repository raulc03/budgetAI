import { View, StyleSheet } from 'react-native';
import ActionButtons from './actionButtons';
import CategoryList from './categoryList';

export default function DetailView() {
  console.log("Renderizando DetailView");
  return (
    <View style={styles.container}>
      {/* ActionButtons */}
      <ActionButtons />
      {/* CategoryList */}
      <CategoryList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 350,
    minHeight: 550,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
  }
})
