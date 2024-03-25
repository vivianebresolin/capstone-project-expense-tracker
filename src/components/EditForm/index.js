import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { useExpenses } from '../../context/expensesContext';
import { formatDateString, parseStringToFloat, formatDateToDB } from '../../utils/utils';
import * as db from '../../database/index';
import styles from "./styles";

const { format: formatCurrency } = Intl.NumberFormat('en-CA', {
  currency: 'CAD',
  style: 'currency',
});

function useAmountInput(amountToEdit) {
  const [amount, setAmount] = useState(amountToEdit);
  function handleChange(value) {
    const decimal = Number(value.replace(/\D/g, '')) / 100;
    setAmount(formatCurrency(decimal || 0).replace('$\xa0', ''));  // '$\xa0' is used as a string to represent the currency symbol for the Canadian Dollar with a non-breaking space between the symbol and the amount
  }
  return [amount, handleChange];
}

export default function EditForm({ closeEditModal, isEditModalVisible, expenseToEdit }) {
  const [amount, setAmount] = useAmountInput(expenseToEdit.amount);
  const [description, setDescription] = useState(expenseToEdit.description);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [previousDate, setPreviousDate] = useState(selectedDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isEditingExpense, setIsEditedExpense] = useState(false);
  const isAndroid = Platform.OS === 'android';
  const { editExpenseInList } = useExpenses();
  const [category, setSelectedCategory] = useState(expenseToEdit.category);
  const categories = ['Home', 'Food', 'Transit', 'Shopping', 'Others'];

  const handleEditingExpense = async () => {
    if (!amount || !description || !selectedDate || !category) {
      console.log(amount, description, selectedDate, category)
      Alert.alert('Edit expense', 'All fields are required.');
      return;
    }

    if (parseStringToFloat(amount) == 0.00) {
      Alert.alert('Edit expense', 'Amount cannot be zero.');
      return;
    }

    if (amount === expenseToEdit.amount && description === expenseToEdit.description && formatDateToDB(selectedDate) === expenseToEdit.date && category === expenseToEdit.category) {
      Alert.alert('Edit expense', 'There is no new data to save.');
      return;
    }

    setIsEditedExpense(true);

    try {
      const editedExpense = {
        id: expenseToEdit.id,
      };

      if (amount !== '') {
        editedExpense.amount = parseStringToFloat(amount);
      } else {
        editedExpense.amount = parseStringToFloat(expenseToEdit.amount);
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
        placeholder="Enter amount"
        value={amount || expenseToEdit.amount}
        onChangeText={(text) => setAmount(text)}
        maxLength={17}
      />
      <Text style={styles.label}>New Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={description || expenseToEdit.description}
        onChangeText={(text) => setDescription(text)}
        maxLength={35}
      />

      <View>
        <Text style={styles.label}>New Date:</Text>
        {!showDatePicker && (
          <TouchableOpacity onPress={toggleDatePicker}>
            <View style={styles.input}>
              <Text style={styles.dateText}>{formatDateString(expenseToEdit.date)}</Text>
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

      <View>
        <Text style={styles.label}>New Category:</Text>
        <View style={[styles.input, styles.pickerSelect]}>
          <RNPickerSelect
            placeholder={{ label: "Select a category...", value: null }}
            items={categories.map(category => ({ label: category, value: category }))}
            onValueChange={(value) => setSelectedCategory(value)}
            value={category || expenseToEdit.category}
          />
        </View>
      </View>

      <TouchableOpacity onPress={handleEditingExpense} style={styles.addExpenseButton}>
        <Text style={styles.textButtonAddExpense}>Edit Expense</Text>
      </TouchableOpacity>

    </View>
  );
};