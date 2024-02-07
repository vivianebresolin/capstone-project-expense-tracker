import { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "./styles";
import FloatingButton from "../../components/FloatingButton";
import AddExpenseModal from "../../components/AddExpenseModal";
import { useExpenses } from '../../context/expensesContext';

export default function Home() {
  const { expenses, addExpenseToTheList, isDataLoaded } = useExpenses();
  const [modalVisible, setModalVisible] = useState(false);

  const handlePressAddExpense = () => {
    setModalVisible(true);
  }

  if (!isDataLoaded) {
    return (
      <View style={styles.loadingIndicatorContainer}>
        <ActivityIndicator size="large" color="#0076FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {expenses.length > 0 && (
        expenses.map((expense, index) =>
          <View key={index} style={{ borderWidth: 1, borderColor: 'black', padding: 5, margin: 3, backgroundColor: 'white' }}>
            <Text>Amount: {expense.amount}</Text>
            <Text>Date: {expense.date}</Text>
            <Text>Description: {expense.description}</Text>
          </View>
        )
      )}
      <AddExpenseModal isModalVisible={modalVisible} closeModal={setModalVisible} />
      <FloatingButton onPress={handlePressAddExpense} iconName={'plus'} />
    </View>
  );
}