import { useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import FloatingButton from "../../components/FloatingButton";
import AddExpenseModal from "../../components/AddExpenseModal";
import EditExpenseModal from "../../components/EditExpenseModal";
import FilterButton from "../../components/FilterButton";
import TotalSpentCard from '../../components/TotalSpentCard';
import { useExpenses } from '../../context/expensesContext';
import styles from "./styles";

export default function Home() {
  const { expenses, isDataLoaded, deleteExpenseFromList } = useExpenses();
  const [modalVisible, setModalVisible] = useState(false);
  const [totalSpent, setTotalSpent] = useState(0);
  const [selectedButton, setSelectedButton] = useState('All Expenses');
  const filterButtonsTitles = ['All Expenses', 'Today', 'Last Seven Days', 'This Month', 'This Year'];

  //Edit expenses
  const [editModalVisible, setEditModalVisible] = useState(null);
  const [editedExpense, setEditedExpense] = useState(null);
  //Delete 
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const handlePressAddExpense = () => {
    setModalVisible(true);
  }

  const handleEditExpense = (expense) => {
    console.log('handleEditExpense', expense)
    setEditedExpense(expense);
    setEditModalVisible(true);
  };

  const handleDeleteExpense = async (expense) => {
    console.log('handleDelete', expense)
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

      <View style={styles.filtersContainer}>
        {filterButtonsTitles.map((title, index) =>
          <FilterButton
            key={index}
            title={title}
            onPress={() => displayExpensesList(title)}
            isSelected={selectedButton === title}
          />
        )}
      </View>

      <TotalSpentCard amount={totalSpent} />

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
      <EditExpenseModal isEditModalVisible={editModalVisible} closeEditModal={setEditModalVisible} expenseToEdit={editedExpense} />

      <FloatingButton onPress={handlePressAddExpense} iconName={'plus'} />
    </View>
  );
}