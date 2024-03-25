import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingTop: 60,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    backIcon: {
      fontSize: 25,
    },
    editProfileText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    profileContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 10,
    },
    profileAction: {
      position: 'absolute',
      right: 6,
      bottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: 34,
      height: 32,
      borderRadius: 9999,
      backgroundColor: '#007bff',
    },
    changePhotoText: {
      fontSize: 16,
      color: '#007BFF',
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 10,
      fontSize: 16,
    },
    saveButton: {
      backgroundColor: '#007BFF',
      paddingVertical: 12,
      borderRadius: 5,
      alignItems: 'center',
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  

export default styles;