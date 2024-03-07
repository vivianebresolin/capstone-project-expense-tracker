import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import * as db from '../../database/index';
import { formatDateString } from '../../utils/utils';
import styles from "./styles";
import { useExpenses } from '../../context/expensesContext';

const { format: formatCurrency } = Intl.NumberFormat('en-CA', {
  currency: 'CAD',
  style: 'currency',
});

function useAmountInput() {
  const [amount, setAmount] = useState('');
  function handleChange(value) {
    const decimal = Number(value.replace(/\D/g, '')) / 100;
    setAmount(formatCurrency(decimal || 0).replace('$\xa0', ''));  // '$\xa0' is used as a string to represent the currency symbol for the Canadian Dollar with a non-breaking space between the symbol and the amount
  }
  return [amount, handleChange];
}

export default function Form({ closeModal, modalVisible }) {
  const [amount, setAmount] = useAmountInput();
  const { addExpenseToTheList } = useExpenses();
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [previousDate, setPreviousDate] = useState(selectedDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSavingExpense, setIsSavingExpense] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const isAndroid = Platform.OS === 'android';
  const categories = ['Home', 'Food', 'Transit', 'Shopping', 'Others'];

  const handleAddExpense = async () => {
    if (!amount || !description || !selectedDate || !selectedCategory) {
      Alert.alert('Add expense', 'All fields are required.');
      return;
    }

    setIsSavingExpense(true);

    await db.addExpense(amount, description, selectedDate, selectedCategory)
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
            onPress: () => closeModal(!modalVisible),
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


  if (isSavingExpense) {
    return (
      <View style={styles.containerSavingExpense}>
        <ActivityIndicator size="large" />
        <Text style={styles.txtSavingExpense}>Saving new expense...</Text>
      </View>
    );
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Amount*:</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder="Enter amount"
        value={amount}
        onChangeText={text => setAmount(text)}
        maxLength={17}
      />

      <Text style={styles.label}>Description*:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        maxLength={35}
      />

      <View>
        <Text style={styles.label}>Date*:</Text>
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

      <View>
        <Text style={styles.label}>Category*:</Text>
        <View style={[styles.input, styles.pickerSelect]}>
          <RNPickerSelect
            placeholder={{ label: 'Select a category...', value: null }}
            onValueChange={(value) => setSelectedCategory(value)}
            items={categories.map(category => ({ label: category, value: category }))}
          />
        </View>
      </View>

      <TouchableOpacity onPress={handleAddExpense} style={styles.addExpenseButton}>
        <Text style={styles.textButtonAddExpense}>Add Expense</Text>
      </TouchableOpacity>

    </View>
  );
};