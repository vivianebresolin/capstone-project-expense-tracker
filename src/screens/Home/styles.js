import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  expenseContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  iconContainer: {
    marginRight: 10, 
    backgroundColor: '#E2E2E2',
    borderRadius: 90,
  },
  expenseText: {
    fontSize: 16,
    color: '#333',
  },

  textContainer: {
    flex: 1, 
  },

  expensesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FCFCFC',
    borderRadius: 8,
    marginBottom: 16,
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
    color:'red',
    fontWeight: '400',
  },


  categoryDateText: {
    fontSize: 14,
    marginBottom: 3,
    color: "#666666",
  },
  
  categoryText: {
    fontSize: 16,
    marginBottom: 3,
    color: "#666666"

  },

  deleteButton: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 1,
    marginHorizontal: 20,
    marginVertical: 2, 
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
    marginTop: 8
  },
  listHeader: {  
    fontWeight: 'bold',
    color:'white',
    paddingTop: 8,
    paddingBottom: 4,
    paddingLeft: 2,
  },
  headerText: {
    margin: 10,
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