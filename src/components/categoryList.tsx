import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TableHeader from "./tableHeader";
import { useEffect } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useUser } from "../context/UserContext";
import Loading from "./loading";
import { userCategoryResponse } from "../types/category";
import { getUserCategories } from "../api/userService";
import { useLoading } from "../context/LoadingContext";
import { useUserCategory } from "../context/UserCategoryContext";

type CategoryListProps = {
  isExpenseActive: boolean;
}

export default function CategoryList({ isExpenseActive }: CategoryListProps) {
  const { isLoading, setIsLoading } = useLoading();
  const { user } = useUser();
  const { userCategoryList, setUserCategoryList } = useUserCategory();

  const gettingUserCategories = async () => {
    if (userCategoryList.length === 0) {
      setIsLoading(true);
    }
    await getUserCategories({ user, userCategoryList, setUserCategoryList });

    if (userCategoryList.length === 0)
      setIsLoading(false);
  }

  useEffect(() => {
    gettingUserCategories();
  }, [userCategoryList]);

  const userCategoriesListFiltered = userCategoryList.filter(it => {
    const type = isExpenseActive ? 'EXPENSE' : 'INCOME';
    return it.transaction_types === type;
  });

  const renderItem = (item: any) => {
    const data: userCategoryResponse = item.item;
    const diff = data.max_amount - data.total_amount;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.circleContainer}>
          <View style={styles.circle} >
            <MaterialIcons name={data.category_img_name as keyof typeof MaterialIcons}
              size={28} color="black" />
          </View>
        </View>
        <View style={styles.amountsContainer}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 16, fontWeight: '700' }}>{data.category_name}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity>
              <Text style={{ fontSize: 16 }}>{decorate_amount(data.max_amount)}</Text>
            </TouchableOpacity>
            <Text>{decorate_amount(data.total_amount)}</Text>
            <Text>{decorate_amount(diff)}</Text>
          </View>
        </View>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <TableHeader />
      {
        !isLoading ? (
          <FlatList
            data={userCategoriesListFiltered}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderRadius: 50,
    backgroundColor: '#00DC95',
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  amountsContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
})

const decorate_amount = (amount: number) => ('S/ ' + amount.toFixed(2))
