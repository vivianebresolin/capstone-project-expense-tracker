import { View, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import styles from "./styles";

export default function Home() {
  const handleAddExpense = () => {
    console.log("Add expense")
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.floatingButton} onPress={handleAddExpense}>
        <AntDesign name="plus" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
}