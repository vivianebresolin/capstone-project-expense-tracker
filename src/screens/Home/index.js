import { useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import FloatingButton from "../../components/FloatingButton";
import AddExpenseModal from "../../components/AddExpenseModal";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePressAddExpense = () => {
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <AddExpenseModal isModalVisible={modalVisible} closeModal={setModalVisible} />
      <FloatingButton onPress={handlePressAddExpense} iconName={'plus'} />
    </View>
  );
}