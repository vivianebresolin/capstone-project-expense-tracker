import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as db from '../database/index';

const ExpensesContext = createContext();
SplashScreen.preventAutoHideAsync();

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [isDataLoaded, setDataLoaded] = useState(false);

  const addExpenseToTheList = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const editExpense = (expenseId) => {
    const expenseToEdit = expenses.find((expense) => expense.id === expenseId);
    setEditingExpense(expenseToEdit);
  };

  useEffect(() => {
    const getAllExpenses = async () => {
      try {
        const expensesFromDB = await db.getAllExpenses();
        setExpenses(expensesFromDB)
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

  return (
    <ExpensesContext.Provider value={{ expenses, addExpenseToTheList, isDataLoaded }}>
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => {
  return useContext(ExpensesContext);
};