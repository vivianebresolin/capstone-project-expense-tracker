import { ScrollView, Text, View } from "react-native";
import styles from "./styles";
import AppPieChart from "./components/AppPieChart";

export default function Insights() {

  return (
    <ScrollView
      style={{
        flex: 1,
      }}>
      <AppPieChart />
    </ScrollView>
  );
}