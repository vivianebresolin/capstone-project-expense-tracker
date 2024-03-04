import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingTop: 8,
    paddingBottom: 4,
    paddingLeft: 2,
  },
  headerText: {
    fontWeight: '500'
  }
});

export default styles;