import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import * as db from '../../database/index';
import { formatDateString } from '../../utils/utils';
import styles from "./styles";
import { useExpenses } from '../../context/expensesContext';

export default function Form({ closeModal, modalVisible }) {
  const { addExpenseToTheList } = useExpenses();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [previousDate, setPreviousDate] = useState(selectedDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSavingExpense, setIsSavingExpense] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const isAndroid = Platform.OS === 'android';
  const categories = ['Home', 'Food', 'Transportation', 'Shopping', 'Others'];

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
        onChangeText={(text) => {
          if (text !== '' && !text.startsWith('-')) {
            setAmount(text);
          }
        }}
      />

      <Text style={styles.label}>Description*:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={description}
        onChangeText={(text) => setDescription(text)}
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