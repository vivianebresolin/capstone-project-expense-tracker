import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20
  },
  selectedButton: {
    backgroundColor: '#0076FF',
  },
  unselectedButton: {
    backgroundColor: 'gray',
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default styles;