import styles from "./styles";
import React, { useState } from 'react';
import { useExpenses } from '../../context/expensesContext';

import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
  Linking
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/themeContext";

export default function Settings() {
  const {deleteAllData} = useExpenses();
  const navigation = useNavigation();
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });
  const { isDarkMode, toggleTheme, theme } = useTheme();
  const rowStyles = [styles.row, isDarkMode && { backgroundColor: '#d9d9d9' }];


  const handleAboutPress = () => {
    Alert.alert(
      'About Us',
      'Developed by Kristina Papko && Viviane Bresolin',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },

      ],
      { cancelable: false }
    );
  };

  const handleContactUsWebsite = () => {
    const websiteUrl = 'https://github.com/vivianebresolin/capstone-project-expense-tracker';
    Linking.openURL(websiteUrl);
  };

  const handleDeleteAllData =() =>{
    Alert.alert(
      'Delete All Expense',
      'Are you sure you want to delete all expenses?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteAllData();
              Alert.alert('Delete expenses', 'Expenses was deleted with success!');
            } catch (error) {
              Alert.alert('Error', `Error trying to delete expense: ${error}`);
            }
          },
        },
      ],
      { cancelable: false }
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? theme.backgroundColor : '#fff' }}>
      <View style={styles.container}>
        <View style={[styles.profile, { backgroundColor: theme.backgroundColor }]}>
          <TouchableOpacity
          >
            <View style={styles.profileAvatarWrapper}>
              <Image
                alt=""
                source={{
                  uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
                style={styles.profileAvatar} />
            </View>
          </TouchableOpacity>
          <View>
            <Text style={[styles.profileName, { color: theme.color }]}>John Doe</Text>
            <Text style={[styles.profileAddress, { color: theme.color }]}>
              123 Maple Street, London/ON, N6U 6T5
            </Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
              style={rowStyles}>
              <Text style={styles.rowLabel}>Edit Profile</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon
                color="#9e9e9e"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
            <View style={rowStyles}>
              <Text style={styles.rowLabel}>Dark Mode</Text>
              <View style={styles.rowSpacer} />
              <Switch
                onValueChange={toggleTheme}
                value={isDarkMode} />
            </View>
            <View style={rowStyles}>
              <Text style={styles.rowLabel}>Push Notifications</Text>
              <View style={styles.rowSpacer} />
              <Switch
                onValueChange={pushNotifications =>
                  setForm({ ...form, pushNotifications })
                }
                value={form.pushNotifications} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>More</Text>
            <TouchableOpacity
              onPress={handleAboutPress}
              style={rowStyles}>
              <Text style={styles.rowLabel}>About Us</Text>
              <View style={styles.rowSpacer} />

            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleContactUsWebsite}
              style={rowStyles}>
              <Text style={styles.rowLabel}>Contact Us</Text>
              <View style={styles.rowSpacer} />

            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDeleteAllData}
              style={rowStyles}>
              <Text style={styles.rowLabel}>Clear all data</Text>
              <View style={styles.rowSpacer} />
             
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}