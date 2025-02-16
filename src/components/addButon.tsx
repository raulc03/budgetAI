import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Alert, Pressable, StyleSheet } from "react-native";
import { pickImage } from "../utils/openLibrary";
import { getUserCategories, registerExpenseOrIncome } from "../api/userService";
import { useUser } from "../context/UserContext";

export default function AddButton() {
  console.log("Renderizando AddButton");
  const { user, userCategoriesList, setUserCategoriesList } = useUser();

  const handlePress = async () => {
    const result = await pickImage();

    if (user && !result.canceled) {
      const data = await registerExpenseOrIncome(result.assets[0].uri, user?.user_id);

      if (data) {
        await getUserCategories({
          user,
          userCategoriesList,
          setUserCategoriesList,
        });
      } else {
        Alert.alert('Error al registrar');
      }
    }
  };

  return (
    <Pressable style={styles.circleButtonContainer}
      onPress={handlePress}
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
