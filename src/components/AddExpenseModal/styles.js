import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  modalView: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 10,
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  textContainer: {
    marginTop: 10,
    display: 'flex',
    gap: 8,
    
  },
  h1: {
    textAlign: 'center',
    fontSize: 24,
    color: 'black',
    fontWeight:'500'
  },
  h2: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666666'
  },
});

export default styles;