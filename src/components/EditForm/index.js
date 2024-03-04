import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as db from '../../database/index';
import { formatDateString } from '../../utils/utils';
import styles from "./styles";
import { useExpenses } from '../../context/expensesContext';
import RNPickerSelect from 'react-native-picker-select';


export default function EditForm({ closeEditModal, isEditModalVisible, expenseToEdit }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [previousDate, setPreviousDate] = useState(selectedDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isEditingExpense, setIsEditedExpense] = useState(false);
  const isAndroid = Platform.OS === 'android';
  const { editExpenseInList } = useExpenses();
  const [category, setSelectedCategory] = useState('');
  const categories = ['Food', 'Transportation', 'Shopping', 'Others'];


  const handleEditingExpense = async () => {
    setIsEditedExpense(true);
  
    try {
      const editedExpense = {
        id: expenseToEdit.id,
      };
  
      if (amount !== '') {
        editedExpense.amount = amount;
      } else {
        editedExpense.amount = expenseToEdit.amount;
      }
  
      if (description !== '') {
        editedExpense.description = description;
      } else {
        editedExpense.description = expenseToEdit.description;
      }
  
      if (selectedDate !== expenseToEdit.date) {
        editedExpense.date = selectedDate;
      } else {
        editedExpense.date = expenseToEdit.date;
      }

      if (category !== '') {
        editedExpense.category = category;
      } else {
        editedExpense.category = expenseToEdit.category;
      }
     
      await db.updateExpense(editedExpense);
      editExpenseInList(editedExpense);
  
      setIsEditedExpense(false);
  
      Alert.alert(
        'Update expense',
        'Expense updated successfully!',
        [
          {
            text: 'OK',
            onPress: () => closeEditModal(!isEditModalVisible),
          }
        ]
      );
    } catch (error) {
      setIsEditedExpense(false);
      console.error('Error editing expense:', error);
      Alert.alert('Error', `Error trying to edit expense: ${error}`);
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
        placeholder= {expenseToEdit.amount}
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />

      <Text style={styles.label}>New Description:</Text>
      <TextInput
        style={styles.input}
        placeholder= {expenseToEdit.description}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

<View>
  <Text style={styles.label}>New Date:</Text>
  {!showDatePicker && (
    <TouchableOpacity onPress={toggleDatePicker}>
      <View style={styles.input}>
        <Text style={styles.dateText} >{expenseToEdit.date}</Text>
      </View>
    </TouchableOpacity>
  )}

<View>
  <Text style={styles.label}>New Category:</Text>
  <RNPickerSelect
    placeholder={{ label: `Selected category: ${expenseToEdit.category}`, value: expenseToEdit.category }}
    items={categories.map(category => ({ label: category, value: category }))}
    onValueChange={(value) => setSelectedCategory(value)}
    value={category} // Update this line
  />
</View>

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