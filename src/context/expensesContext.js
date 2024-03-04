import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as db from '../database/index';
import { formatDateToDB, getTimeRangeHeaderText, isToday, isWithinLastSevenDays, isThisMonth, isThisYear } from '../utils/utils';

const ExpensesContext = createContext();
SplashScreen.preventAutoHideAsync();

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [totalSpent, setTotalSpent] = useState(0);
  const [selectedButton, setSelectedButton] = useState('All Expenses');
  const [headerText, setHeaderText] = useState('All Expenses');
  const [selectedCategory, setSelectedCategory] = useState('All Categories'); // Initialize with 'All Categories'
  const categories = ['All Categories', 'Food', 'Transportation', 'Shopping', 'Others']; // Define your categories

  const addExpenseToTheList = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const editExpenseInList = async (editedExpense) => {
    try {
      if (!editedExpense || !editedExpense.id) {
        throw new Error('Edited expense or its ID is undefined');
      }
      await db.updateExpense(editedExpense);
      const updatedExpenses = expenses.map(expense => {
        if (editedExpense.id === expense.id) {
          expense.amount = editedExpense.amount || expense.amount == expense.amount;
          expense.description = editedExpense.description;
          expense.date = formatDateToDB(editedExpense.date);
          expense.category = editedExpense.category;
          
        }
        return expense;
      })
      setExpenses(updatedExpenses)
    } catch (error) {
      Alert.alert('Error', 'Failed to edit expense.');
    }
  };

  const deleteExpenseFromList = async (deletedExpenseId) => {
    try {
      await db.deleteExpense(deletedExpenseId);
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== deletedExpenseId));
    } catch (error) {
      console.error('Error deleting expense:', error);
      Alert.alert('Error', 'Failed to delete expense.');
    }
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

  useEffect(() => {
    const getAllExpenses = async () => {
      try {
        const expensesFromDB = await db.getAllExpenses();
        setExpenses(expensesFromDB);
        setDataLoaded(true);
        SplashScreen.hideAsync();
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to fetch data.');
        SplashScreen.hideAsync();
      }
    };

    getAllExpenses();
  }, []);

  useEffect(() => {
    setFilteredExpenses(expenses);
    setSelectedButton('All Expenses');
    calculateTotalSpent(expenses);
  }, [expenses]);

  return (
    <ExpensesContext.Provider
      value={
        {
          expenses,
          addExpenseToTheList,
          editExpenseInList,
          deleteExpenseFromList,
          isDataLoaded,
          filteredExpenses,
          setFilteredExpenses,
          displayExpensesList,
          totalSpent,
          selectedButton,
          headerText
        }
      }
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => {
  return useContext(ExpensesContext);
};