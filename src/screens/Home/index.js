import { useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, ScrollView } from 'react-native';
import FloatingButton from "../../components/FloatingButton";
import AddExpenseModal from "../../components/AddExpenseModal";
import EditExpenseModal from "../../components/EditExpenseModal";
import FilterButton from "../../components/FilterButton";
import TotalSpentCard from '../../components/TotalSpentCard';
import { useExpenses } from '../../context/expensesContext';
import CategoriesDropdown from "../../components/CategoriesDropdown";
import styles from "./styles";

export default function Home() {
  const {
    isDataLoaded,
    deleteExpenseFromList,
    filteredExpenses,
    displayExpensesList,
    totalSpent,
    selectedButton,
    headerText
  } = useExpenses();
  const [modalVisible, setModalVisible] = useState(false);
  const filterButtonsTitles = ['All Expenses', 'Today', 'Last Seven Days', 'This Month', 'This Year'];
  const [selectedCategoryButton, setSelectedCategoryButton] = useState('All Expenses');
  const [selectedCategory, setSelectedCategory] = useState(null);
  //Edit expenses
  const [editModalVisible, setEditModalVisible] = useState(null);
  const [editedExpense, setEditedExpense] = useState(null);


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedCategoryButton('All Expenses'); 
  };
  const handlePressAddExpense = () => {
    setModalVisible(true);
  }

  const handleEditExpense = (expense) => {
    setEditedExpense(expense);
    setEditModalVisible(true);
  };

  const handleDeleteExpense = async (expense) => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteExpenseFromList(expense.id);
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

      <CategoriesDropdown
        categories={['Food', 'Transportation', 'Shopping', 'Others']}
        onSelectCategory={handleCategoryChange}
      />


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
                <Text>Category: {expense.category}</Text>
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