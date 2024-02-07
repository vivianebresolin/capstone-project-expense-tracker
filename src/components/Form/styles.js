import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  containerSavingExpense: {
    marginVertical: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
  },
  datePicker: {
    height: 120,
    marginTop: -14
  },
  iosDatePickerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 4
  },
  iosButton: {
    marginTop: -5,
    marginRight: 10,
    backgroundColor: '#F0F0F0',
    padding: 8,
    borderRadius: 8,
    width: 75,
  },
  textCancelButton: {
    textAlign: 'center',
  },
  textConfirmButton: {
    textAlign: 'center',
    color: '#027DFF',
  },
  addExpenseButton: {
    backgroundColor: '#7393B3',
    borderRadius: 8,
    padding: 12,
    marginTop: 32,
  },
  textButtonAddExpense: {
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
  txtSavingExpense: {
    fontSize: 16,
    marginTop: 8
  },
});

export default styles;