import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, ScrollView } from 'react-native';
import FloatingButton from "../../components/FloatingButton";
import AddExpenseModal from "../../components/AddExpenseModal";
import EditExpenseModal from "../../components/EditExpenseModal";
import FilterButton from "../../components/FilterButton";
import TotalSpentCard from '../../components/TotalSpentCard';
import { useExpenses } from '../../context/expensesContext';
import CategoriesDropdown from "../../components/CategoriesDropdown";
import { FontAwesome } from '@expo/vector-icons';
import { formatDateString } from '../../utils/utils';
import styles from "./styles";

export default function Home() {
  const {
    isDataLoaded,
    deleteExpenseFromList,
    filteredExpenses,
    displayExpensesList,
    totalSpent,
    selectedButton,
    headerText,
  } = useExpenses();
  const [modalVisible, setModalVisible] = useState(false);
  //Filter expenses by date and category
  const filterButtonsTitles = ['All Expenses', 'Today', 'Last Seven Days', 'This Month', 'This Year'];
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  //Edit expenses
  const [editModalVisible, setEditModalVisible] = useState(null);
  const [editedExpense, setEditedExpense] = useState(null);

  const categoryIcons = { Home: 'home', Food: 'cutlery', Transit: 'car', Shopping: 'shopping-cart', Others: 'money' };

  useEffect(() => {
    displayExpensesList(selectedButton, selectedCategory);
  }, [selectedButton, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
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
              Alert.alert('Delete expense', 'Expense deleted with success!');
            } catch (error) {
              Alert.alert('Error deleting expense ', error);
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
        categories={['All Categories', 'Home', 'Food', 'Transit', 'Shopping', 'Others']}
        onSelectCategory={handleCategoryChange}
      />

      <TotalSpentCard amount={totalSpent} />

      <View style={styles.listHeader}>
        <Text style={styles.headerText}>{headerText}</Text>
      </View>
      {filteredExpenses.length === 0 ? (
        <Text style={styles.noExpenseText}>No expenses for this period.</Text>
      ) : (
        <ScrollView>
          {filteredExpenses.map((expense, index) =>
            <View key={index}>
              <TouchableOpacity onPress={() => handleEditExpense(expense)} >
                <View style={styles.expensesContainer}>
                  <View style={styles.expenseContainer}>
                    <View style={styles.iconContainer}>
                      <FontAwesome name={categoryIcons[expense.category] || 'dollar'} size={30} color="#327AFf" />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.categoryAmountText}>{expense.description}</Text>
                      <Text style={styles.categoryText}>{expense.category} | {formatDateString(expense.date)} </Text>
                    </View>
                    <View>
                      <Text style={styles.categoryInnerAmountText}> -${expense.amount}</Text>
                    </View>
                    <View style={styles.deleteButton}>
                      <TouchableOpacity onPress={() => handleDeleteExpense(expense)} >
                        <FontAwesome name="trash" size={22} color="gray" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
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