import { useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, ScrollView } from 'react-native';
import FloatingButton from "../../components/FloatingButton";
import AddExpenseModal from "../../components/AddExpenseModal";
import EditExpenseModal from "../../components/EditExpenseModal";
import FilterButton from "../../components/FilterButton";
import TotalSpentCard from '../../components/TotalSpentCard';
import { useExpenses } from '../../context/expensesContext';
import { getTimeRangeHeaderText, isToday, isWithinLastSevenDays, isThisMonth, isThisYear } from "../../utils/utils";
import styles from "./styles";

export default function Home() {
  const { expenses, isDataLoaded, deleteExpenseFromList } = useExpenses();
  const [modalVisible, setModalVisible] = useState(false);
  const [totalSpent, setTotalSpent] = useState(0);
  const [headerText, setHeaderText] = useState('All Expenses');
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
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

  const displayExpensesList = (timeRange) => {
    setSelectedButton(timeRange);

    let updatedExpensesList = [];

    switch (timeRange) {
      case 'Today':
        updatedExpensesList = expenses.filter(expense => isToday(new Date(expense.date + 'T12:00:00Z')));
        break;
      case 'Last Seven Days':
        updatedExpensesList = expenses.filter(expense => isWithinLastSevenDays(new Date(expense.date + 'T12:00:00Z')));
        break;
      case 'This Month':
        updatedExpensesList = expenses.filter(expense => isThisMonth(new Date(expense.date + 'T12:00:00Z')));
        break;
      case 'This Year':
        updatedExpensesList = expenses.filter(expense => isThisYear(new Date(expense.date + 'T12:00:00Z')));
        break;
      default:
        updatedExpensesList = expenses;
    }

    setFilteredExpenses(updatedExpensesList);

    const listHeader = getTimeRangeHeaderText(timeRange);
    setHeaderText(listHeader);

    calculateTotalSpent(updatedExpensesList);
  }

  const calculateTotalSpent = (filteredExpenses) => {
    const total = filteredExpenses.reduce((total, expense) => total + Number(expense.amount), 0);
    setTotalSpent(total);
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

      <View style={styles.listHeader}>
        <Text style={styles.headerText}>{headerText}</Text>
      </View>
      {filteredExpenses.length === 0 ? (
        <Text>No expenses for this period.</Text>
      ) : (
        <ScrollView>
          {filteredExpenses.map((expense, index) =>
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
          )}
        </ScrollView>
      )}

      <AddExpenseModal isModalVisible={modalVisible} closeModal={setModalVisible} />
      <EditExpenseModal isEditModalVisible={editModalVisible} closeEditModal={setEditModalVisible} expenseToEdit={editedExpense} />

      <FloatingButton onPress={handlePressAddExpense} iconName={'plus'} />
    </View>
  );
}