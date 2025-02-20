import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { pickImage } from "../utils/openLibrary";
import { getUserCategories, registerExpenseOrIncome } from "../api/userService";
import { useUser } from "../context/UserContext";
import { useUserCategory } from "../context/UserCategoryContext";

export default function AddButton() {
  const { user } = useUser();
  const { userCategoryList, setUserCategoryList } = useUserCategory();

  const handlePress = async () => {
    const result = await pickImage();

    if (user && !result.canceled) {
      const data = await registerExpenseOrIncome(result.assets[0].uri, user?.user_id);

      if (data) {
        await getUserCategories({
          user,
          userCategoryList,
          setUserCategoryList,
        });
      } else {
        Alert.alert('Error al registrar');
      }
    }
  };

  return (
    <TouchableOpacity style={styles.circleButtonContainer}
      onPress={handlePress}
    >
      <MaterialIcons name="add" size={30} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    marginRight: 15,
    width: 70,
    height: 70,
    backgroundColor: "#00DC95",
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -25,
    right: 0,
  },
})
