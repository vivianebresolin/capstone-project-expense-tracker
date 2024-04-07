import { View, Modal, Text, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Form from "../Form";
import styles from "./styles";

export default function AddExpenseModal({ isModalVisible, closeModal, theme }) {

  return (
    <View styles={{ flex: 1 }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          closeModal(!isModalVisible);
        }}>
        <View style={[styles.centeredView, theme.isDarkMode && { backgroundColor: 'rgba(240, 240, 240, 0.55)' }]}>
          <View style={[styles.modalView, theme.isDarkMode && { backgroundColor: theme.backgroundColor }]}>
            <Pressable
              onPress={() => closeModal(!isModalVisible)}
              style={{ alignSelf: 'flex-end' }}
            >
              <AntDesign name="closecircleo" size={24} color={theme.isDarkMode ? theme.color : '#000000'} />
            </Pressable>
            <View style={styles.textContainer}>
              <Text style={[styles.h1, theme.isDarkMode && { color: theme.color }]}>Let's track your spending!</Text>
              <Text style={[styles.h2, theme.isDarkMode && { color: theme.color }]}>Please enter the details of your expense below:</Text>
            </View>
            <Form closeModal={closeModal} modalVisible={isModalVisible} />
          </View>
        </View>
      </Modal>
    </View>
  );
}