import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import FloatingButton from "../../components/FloatingButton";
import AddExpenseModal from "../../components/AddExpenseModal";
import EditExpenseModal from "../../components/EditExpenseModal";
import FilterButton from "../../components/FilterButton";
import TotalSpentCard from '../../components/TotalSpentCard';
import CategoriesDropdown from "../../components/CategoriesDropdown";
import { useExpenses } from '../../context/expensesContext';
import { useTheme } from '../../context/themeContext';
import { formatDateString } from '../../utils/utils';
import styles from "./styles";

export default function Home() {
  const {
    isDataLoaded,
    isDeletingData, 
    deleteExpenseFromList,
    filteredExpenses,
    displayExpensesList,
    totalSpent,
    selectedButton,
    headerText,
  } = useExpenses();
  const { theme, isDarkMode } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const filterButtonsTitles = ['All Expenses', 'Today', 'Last Seven Days', 'This Month', 'This Year'];
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [editModalVisible, setEditModalVisible] = useState(null);
  const [editedExpense, setEditedExpense] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const categoryIcons = { Home: 'home', Food: 'cutlery', Transit: 'car', Shopping: 'shopping-cart', Others: 'money' };
  useEffect(() => {
    if (isDeletingData) {
      setLoading(true); 
    } else {
      setLoading(false);
    }
  }, [isDeletingData]);

  useEffect(() => {
    if(!isDeletingData){
      displayExpensesList(selectedButton, selectedCategory);
    }
  }, [isDeletingData, selectedButton, selectedCategory]);



  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePressAddExpense = () => {
    setModalVisible(true);
  };

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
              Alert.alert('Error', `Error trying to delete expense: ${error}`);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (!isDataLoaded || isLoading) {
    return (
      <View style={styles.loadingIndicatorContainer}>
        <ActivityIndicator size="large" color="#0076FF" />
      </View>
    );
  }

  return (
    <View style={[styles.container, theme]}>
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
        categories={['Home', 'Food', 'Transit', 'Shopping', 'Others']}
        onSelectCategory={handleCategoryChange}
      />

      <TotalSpentCard amount={totalSpent} />

      <View style={styles.listHeader}>
        <Text style={[styles.headerText, { color: theme.color }]}>{headerText}</Text>
      </View>
      {filteredExpenses.length === 0 ? (
        <Text style={[styles.noExpenseText, { color: theme.color }]}>No expenses for this period.</Text>
      ) : (
        <ScrollView>
          {filteredExpenses.map((expense, index) =>
            <View key={index} style={index === filteredExpenses.length - 1 && { marginBottom: 75 }}>
              <TouchableOpacity onPress={() => handleEditExpense(expense)} >
                <View style={[styles.expensesContainer, isDarkMode && { backgroundColor: '#e3e3e3' }]}>
                  <View style={styles.expenseContainer}>
                    <View style={[styles.iconContainer, isDarkMode && { backgroundColor: '#ffffff' }]}>
                      <FontAwesome name={categoryIcons[expense.category] || 'dollar'} size={30} color='#327AFF' />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.categoryAmountText}>{expense.description}</Text>
                      <Text style={[styles.categoryText, isDarkMode && { color: '#161616' }]}>{expense.category} | {formatDateString(expense.date)} </Text>
                    </View>
                    <View>
                      <Text style={[styles.categoryInnerAmountText, isDarkMode && { color: '#990000', fontWeight: 'bold' }]}> -${expense.amount}</Text>
                    </View>
                    <View style={styles.deleteButton}>
                      <TouchableOpacity onPress={() => handleDeleteExpense(expense)} >
                        <FontAwesome name="trash" size={22} color={isDarkMode ? '#2d2d2d' : 'gray'} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}

      <AddExpenseModal isModalVisible={modalVisible} closeModal={setModalVisible} theme={{ ...theme, isDarkMode: isDarkMode }} />
      <EditExpenseModal isEditModalVisible={editModalVisible} closeEditModal={setEditModalVisible} expenseToEdit={editedExpense} theme={{ ...theme, isDarkMode: isDarkMode }} />
      <FloatingButton onPress={handlePressAddExpense} iconName={'plus'} />
    </View>
  );
}
