import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#232B5D',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  chartView: {
    padding: 20,
    alignItems: 'center'
  },
  legendTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  legendText: {
    color: 'white',
    marginLeft: 5
  }
});

export default styles;