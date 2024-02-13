import { View, Modal, Text, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import styles from "./styles";
import { useState, useEffect } from 'react';
import EditForm from "../EditForm";


export default function EditExpenseModal({ isModalVisible1, closeModal1, expenseToEdit }) {

  return (
    <View styles={{ flex: 1 }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible1}
        onRequestClose={() => {
          closeModal1(!isModalVisible1);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              onPress={() => closeModal1(!isModalVisible1)}
              style={{ alignSelf: 'flex-end' }}
            >
              <AntDesign name="closecircleo" size={24} color="black" />
            </Pressable>
            <View style={styles.textContainer}>
              <Text style={styles.h1}>Let's edit your spending!</Text>
              <Text style={styles.h2}>Please change the details of your expense below:</Text>
            </View>
            <EditForm closeModal1={closeModal1} isModalVisible1={isModalVisible1} expenseToEdit={expenseToEdit} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

