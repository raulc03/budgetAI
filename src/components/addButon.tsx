import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  handlyClassify: () => void;
}

export default function AddButton({ handlyClassify }: Props) {
  return (
    <Pressable style={styles.circleButtonContainer}
      onPress={handlyClassify}
    >
      <MaterialIcons name="add" size={30} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    margin: 10,
    width: 80,
    height: 80,
    backgroundColor: "#00DC95",
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
})
