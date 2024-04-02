import { Platform, StyleSheet } from "react-native";

const isAndroid = Platform.OS === 'android';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dadada',
    borderRadius: isAndroid ? 10 : 8,
    marginTop: 8,
  }
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    textAlign: 'center'
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 9,
    paddingHorizontal: 10,
    color: 'black',
    textAlign: 'center'
  },
  placeholder: {
    color: 'black'
  },
  iconContainer: {
    top: isAndroid ? 14 : 13,
    right: isAndroid ? 120 : 110,
  },
});
