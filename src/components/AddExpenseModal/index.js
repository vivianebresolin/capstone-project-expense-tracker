import { View, Modal, Text, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import styles from "./styles";
import Form from "../Form";

export default function AddExpenseModal({ isModalVisible, closeModal }) {

  return (
    <View styles={{ flex: 1 }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          closeModal(!isModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              onPress={() => closeModal(!isModalVisible)}
              style={{ alignSelf: 'flex-end' }}
            >
              <AntDesign name="closecircleo" size={24} color="black" />
            </Pressable>
            <View style={styles.textContainer}>
              <Text style={styles.h1}>Let's track your spending!</Text>
              <Text style={styles.h2}>Please enter the details of your expense below:</Text>
            </View>
            <Form closeModal={closeModal} modalVisible={isModalVisible} />
          </View>
        </View>
      </Modal>
    </View>
  );
}