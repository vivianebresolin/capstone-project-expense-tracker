import { useState } from "react";
import { View, TouchableOpacity, Modal, Text, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import styles from "./styles";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePressAddExpense = () => {
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}>
              <Text>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.floatingButton} onPress={handlePressAddExpense}>
        <AntDesign name="plus" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
}