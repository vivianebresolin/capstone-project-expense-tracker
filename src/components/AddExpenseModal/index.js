import { View, Modal, Text, Pressable } from "react-native";
import styles from "./styles";

export default function AddExpenseModal({ isModalVisible, closeModal }) {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        closeModal(!isModalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
          <Pressable
            onPress={() => closeModal(!isModalVisible)}>
            <Text>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}