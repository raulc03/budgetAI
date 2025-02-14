import { View, StyleSheet } from 'react-native';
import ActionButtons from './actionButtons';
import CategoryList from './categoryList';
import { useState } from 'react';

type Props = {
  user_id: number
}

export default function DetailView({ user_id }: Props) {

  return (
    <View style={styles.container}>
      {/* ActionButtons */}
      <ActionButtons />
      {/* CategoryList */}
      <CategoryList user_id={user_id} />
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
