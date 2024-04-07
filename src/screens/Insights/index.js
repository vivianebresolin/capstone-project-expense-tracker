import { ScrollView, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppPieChart from "./components/AppPieChart";
import AppBarChart from "./components/AppBarChart";
import { useExpenses } from "../../context/expensesContext";
import { useTheme } from "../../context/themeContext";
import styles from "./styles";

export default function Insights() {
  const { expenses } = useExpenses();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleAddExpense = () => {
    navigation.navigate("Home");
  };

  if (expenses.length === 0) {
    return (
      <View style={[styles.emptyState, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.emptyStateText, { color: theme.color }]}>
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
      style={[styles.scrollView, { backgroundColor: theme.backgroundColor }]}>
      <AppBarChart />
      <View style={styles.pieChartView}>
        <AppPieChart />
      </View>
    </ScrollView>
  );
}