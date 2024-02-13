import { useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import styles from "./styles";
import FloatingButton from "../../components/FloatingButton";
import AddExpenseModal from "../../components/AddExpenseModal";
import EditExpenseModal from "../../components/EditExpenseModal";
import { useExpenses } from '../../context/expensesContext';

export default function Home() {
  const { expenses, isDataLoaded } = useExpenses();
  const [modalVisible, setModalVisible] = useState(false);
 
  //Edit expenses
  const [modalVisible1, setModalVisible1] = useState(null);
  const [editedExpense, setEditedExpense] = useState(null);
  //Delete 
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const { deleteExpenseFromList } = useExpenses();

  const handlePressAddExpense = () => {
    setModalVisible(true);
  }

  const handleEditExpense = (expense) => {
    setEditedExpense(expense);
    setModalVisible1(true);

  };

  const handleDeleteExpense = async (expense) => {
    setExpenseToDelete(expense);
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        {
          text: 'Cancel',
          onPress: () => setExpenseToDelete(null),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteExpenseFromList(expense.id);
              setExpenseToDelete(null);
            } catch (error) {
              console.error('Error deleting expense: ', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

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
            <TouchableOpacity onPress={() => handleEditExpense(expense)} >
              <Text>Amount: {expense.amount}</Text>
              <Text>Date: {expense.date}</Text>
              <Text>Description: {expense.description}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteExpense(expense)}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )
      )}

      <AddExpenseModal isModalVisible={modalVisible} closeModal={setModalVisible} />
      <EditExpenseModal isModalVisible1={modalVisible1} closeModal1={setModalVisible1} expenseToEdit={editedExpense} />
      <FloatingButton onPress={handlePressAddExpense} iconName={'plus'} />
    </View>
  );
}