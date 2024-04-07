import { View, Modal, Text, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import styles from "./styles";
import EditForm from "../EditForm";


export default function EditExpenseModal({ isEditModalVisible, closeEditModal, expenseToEdit, theme }) {

  return (
    <View styles={{ flex: 1 }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => {
          closeEditModal(!isEditModalVisible);
        }}>
        <View style={[styles.centeredView, theme.isDarkMode && { backgroundColor: 'rgba(240, 240, 240, 0.55)' }]} >
          <View style={[styles.modalView, theme.isDarkMode && { backgroundColor: theme.backgroundColor }]}>
            <Pressable
              onPress={() => closeEditModal(!isEditModalVisible)}
              style={{ alignSelf: 'flex-end' }}
            >
              <AntDesign name="closecircleo" size={24} color={theme.isDarkMode ? theme.color : '#000000'} />
            </Pressable>
            <View style={styles.textContainer}>
              <Text style={[styles.h1, theme.isDarkMode && { color: theme.color }]}>Let's edit your spending!</Text>
              <Text style={[styles.h2, theme.isDarkMode && { color: theme.color }]}>Please change the details of your expense below:</Text>
            </View>
            <EditForm closeEditModal={closeEditModal} isEditModalVisible={isEditModalVisible} expenseToEdit={expenseToEdit} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

