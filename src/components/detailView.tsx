import { View, StyleSheet } from 'react-native';
import ActionButtons from './actionButtons';
import CategoryList from './categoryList';
import { useState } from 'react';

export default function DetailView() {
  const [isExpenseActive, setIsExpenseActive] = useState<boolean>(true);
  return (
    <View style={styles.container}>
      {/* ActionButtons */}
      <ActionButtons isExpenseActive={isExpenseActive} setIsExpenseActive={setIsExpenseActive} />
      {/* CategoryList */}
      <CategoryList isExpenseActive={isExpenseActive} />
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
