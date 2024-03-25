import { ScrollView, View } from "react-native";
import AppPieChart from "./components/AppPieChart";
import AppBarChart from "./components/AppBarChart";
import styles from "./styles";

export default function Insights() {
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