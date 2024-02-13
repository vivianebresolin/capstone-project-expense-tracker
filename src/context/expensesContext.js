import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as db from '../database/index';
import { formatDateToDB } from '../utils/utils';

const ExpensesContext = createContext();
SplashScreen.preventAutoHideAsync();

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [isDataLoaded, setDataLoaded] = useState(false);

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
          expense.amount = editedExpense.amount;
          expense.description = editedExpense.description;
          expense.date = formatDateToDB(editedExpense.date);
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

  return (
    <ExpensesContext.Provider
      value={{ expenses, addExpenseToTheList, editExpenseInList, deleteExpenseFromList, isDataLoaded }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => {
  return useContext(ExpensesContext);
};