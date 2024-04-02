import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  expenseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#ededed',
    borderRadius: 50,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  expenseText: {
    fontSize: 16,
    color: '#333',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10
  },
  expensesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FCFCFC',
    borderRadius: 10,
    marginBottom: 8,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 9,
  },
  categoryAmountText: {
    fontSize: 20,
    marginBottom: 3,
    fontWeight: '600',
  },
  categoryInnerAmountText: {
    fontSize: 20,
    marginBottom: 3,
    color: 'red',
    fontWeight: '400',
  },
  categoryDateText: {
    fontSize: 14,
    marginBottom: 3,
    color: "#666666",
  },
  categoryText: {
    fontSize: 15,
    marginBottom: 3,
    color: "#666666"
  },
  deleteButton: {
    marginLeft: 25,
    marginRight: 5,
  },
  loadingIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  listHeader: {
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 8,
    paddingBottom: 4,
  },
  headerText: {
    marginVertical: 10,
    fontWeight: '500',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noExpenseText: {
    margin: 10,
    fontWeight: '400',
    textAlign: 'left',
    fontSize: 16,
  }
});

export default styles;