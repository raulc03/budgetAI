import { StyleSheet, View } from 'react-native';
import { Bounce } from 'react-native-animated-spinkit';

export default function Loading() {
  return (
    <View style={styles.container}>
      <Bounce size={90} color="#00DC95" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
