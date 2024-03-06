import { Text, View } from "react-native";
import styles from "./styles";
import { formatNumberIntoCurrency } from "../../utils/utils";

export default function TotalSpentCard({ amount }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Spent:</Text>
      <Text style={styles.amount}>{formatNumberIntoCurrency(amount) ?? '$0'}</Text>
    </View>
  );
}