import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import TableHeader from "./tableHeader";
import { supabase } from "../api/supabase";
import { useEffect, useState } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  user_id: number
}

type categoryUserResponse = {
  category_id: number;
  category_name: string;
  category_img_name: string;
  total_amount: number;
  max_amount: number;
}

export default function CategoryList({ user_id }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [categoriesData, setCategoriesData] = useState<categoryUserResponse[]>([]);

  useEffect(() => {
    getUserCategory();
  }, [categoriesData]);

  const getUserCategory = async () => {
    const { data, error } = await supabase.rpc('get_user_category_totals', {
      p_user_id: user_id
    });
    if (error) {
      console.log("No se pudo obtener información de las categorías: ", error);
      Alert.alert("Error al obtener categorías");
    }
    else {
      setCategoriesData(data);
    }
  }

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
      <FlatList
        data={categoriesData}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.category_id}
      />
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
