import { ScrollView, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppPieChart from "./components/AppPieChart";
import AppBarChart from "./components/AppBarChart";
import styles from "./styles";
import { useExpenses } from "../../context/expensesContext";

export default function Insights() {
  const { expenses } = useExpenses();
  const navigation = useNavigation();

  const handleAddExpense = () => {
    navigation.navigate("Home");
  };

  if (expenses.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>
          There is no data available to show insights
        </Text>
        <Button
          title="Add Expense"
          onPress={handleAddExpense}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scrollView}>
      <AppBarChart />
      <View style={styles.pieChartView}>
        <AppPieChart />
      </View>
    </ScrollView>
  );
}