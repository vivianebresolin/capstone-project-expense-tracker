import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as db from '../../database/index';
import { formatDateString } from '../../utils/utils';
import styles from "./styles";
import { useExpenses } from '../../context/expensesContext';

export default function EditForm({ closeModal1, modalVisible1, expenseToEdit }) {
  const { addExpenseToTheList, editExpense, setExpenses } = useExpenses();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [previousDate, setPreviousDate] = useState(selectedDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSavingExpense, setIsSavingExpense] = useState(false);
  const [isEditingExpense, setIsEditedExpense] = useState(false);
  const isAndroid = Platform.OS === 'android';


  useEffect(() => {
    if (expenseToEdit) {
      setAmount(String(expenseToEdit.amount));
      setDescription(expenseToEdit.description);
      setSelectedDate(new Date(expenseToEdit.date));
      setPreviousDate(new Date(expenseToEdit.date));
    }
  }, [expenseToEdit]);



  const handleEditingExpense = async () => {
 
    setIsSavingExpense(true);

    await db.addExpense(amount, description, selectedDate)
      .then((result) => {
        addExpenseToTheList(result);

        setAmount('');
        setDescription('');
        setSelectedDate(new Date());
        setPreviousDate(new Date());

        setIsSavingExpense(false)

        Alert.alert('Add expense', 'Expense added successfully!', [
          {
            text: 'Home',
            onPress: () => closeModal1(!modalVisible1),
          },
          {
            text: 'Add other expense',
          }
        ]);
      })
      .catch(error => {
        setIsSavingExpense(false);
        Alert.alert('Error', `Error trying to add new expense: ${error}`)
      })
  };
  
  // Function to handle updating one or all fields of the expense
  const updateExpenseField = (field, value) => {
    switch (field) {
      case 'amount':
        setAmount(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'date':
        setSelectedDate(value);
        break;
      default:
        break;
    }
  };
  
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker)
  };

  const iosCancel = () => {
    toggleDatePicker();
    if (previousDate !== selectedDate) {
      setSelectedDate(previousDate)
    }
  }

  const iosConfirm = () => {
    toggleDatePicker();
    setPreviousDate(selectedDate)
  };

  const handleDateChange = ({ type }, selectedDate) => {
    if (type === 'set') {
      setSelectedDate(selectedDate);

      if (isAndroid) toggleDatePicker();
    } else {
      toggleDatePicker();
    }
  };

  if (isEditingExpense) {
    return (
      <View style={styles.containerSavingExpense}>
        <ActivityIndicator size="large" />
        <Text style={styles.txtSavingExpense}>Updating the expense...</Text>
      </View>
    );
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>New Amount:</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder="New Amount"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />

      <Text style={styles.label}>New Description*:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <View>
        <Text style={styles.label}>New Date:</Text>
        {!showDatePicker && (
          <TouchableOpacity onPress={toggleDatePicker}>
            <View style={styles.input}>
              <Text style={styles.dateText}>{formatDateString(selectedDate)}</Text>
            </View>
          </TouchableOpacity>
        )}

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
            style={styles.datePicker}
          />
        )}

        {showDatePicker && !isAndroid && (
          <View style={styles.iosDatePickerButtonsContainer}>
            <TouchableOpacity onPress={iosCancel} style={styles.iosButton}>
              <Text style={styles.textCancelButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={iosConfirm} style={styles.iosButton}>
              <Text style={styles.textConfirmButton}>Confirm</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={handleEditingExpense} style={styles.addExpenseButton}>
        <Text style={styles.textButtonAddExpense}>Edit Expense</Text>
      </TouchableOpacity>
      
    </View>
  );
};