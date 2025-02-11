import { Pressable, StyleSheet, Text, View } from "react-native";
import BalanceHeader from "@/app/components/balanceHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import DetailView from "@/app/components/detailView";

export default function Index() {
  const amount = '1,000';
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <BalanceHeader amount={amount} />
      {/* BudgetTable */}
      <DetailView />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
    paddingHorizontal: 10,
  },
})
