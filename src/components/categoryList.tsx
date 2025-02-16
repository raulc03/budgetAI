import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import TableHeader from "./tableHeader";
import { useEffect } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useUser } from "../context/UserContext";
import Loading from "./loading";
import { categoryUserResponse } from "../types/category";
import { getUserCategories } from "../api/userService";
import { useLoading } from "../context/LoadingContext";

export default function CategoryList() {
  console.log("Renderizando CategoryList");
  const { isLoading, setIsLoading } = useLoading();
  const { user, userCategoriesList, setUserCategoriesList } = useUser();


  const gettingUserCategories = async () => {
    if (userCategoriesList.length === 0) {
      setIsLoading(true);
    }
    await getUserCategories({ user, userCategoriesList, setUserCategoriesList });

    if (userCategoriesList.length === 0)
      setIsLoading(false);
  }

  useEffect(() => {
    gettingUserCategories();
  }, [userCategoriesList]);

  const renderItem = (item: any) => {
    const data: categoryUserResponse = item.item;
    const diff = data.max_amount - data.total_amount;

    const pressCategory = (category_name: string) => {
      Alert.alert("Categoría: " + category_name);
    }

    return (
      <Pressable style={styles.itemContainer} onPress={() => pressCategory(data.category_name)}>
        <View style={styles.circleContainer}>
          <View style={styles.circle} >
            <MaterialIcons name={data.category_img_name as keyof typeof MaterialIcons}
              size={24} color="black" />
          </View>
        </View>
        <View style={styles.amountsContainer}>
          <Text>{decorate_amount(data.max_amount)}</Text>
          <Text>{decorate_amount(data.total_amount)}</Text>
          <Text>{decorate_amount(diff)}</Text>
        </View>
      </Pressable>
    )
  };

  return (
    <View style={styles.container}>
      <TableHeader />
      {
        !isLoading ? (
          <FlatList
            data={userCategoriesList}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.category_id}
          />
        ) : <Loading />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  circle: {
    borderRadius: 50,
    backgroundColor: '#00DC95',
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountsContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

const decorate_amount = (amount: number) => ('S/ ' + amount.toFixed(2))
