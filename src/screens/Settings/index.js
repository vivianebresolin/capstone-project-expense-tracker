import styles from "./styles";
import React, { useState } from 'react';
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

export default function Settings() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });
  

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.profile}>
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
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileAddress}>
              123 Maple Street. London, ON N6U 6T5
            </Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            <TouchableOpacity
              onPress={()=> navigation.navigate("EditProfile")}
              style={styles.row}>
              <Text style={styles.rowLabel}>Edit Profile</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Dark Mode</Text>
              <View style={styles.rowSpacer} />
              <Switch
                onValueChange={darkMode => setForm({ ...form, darkMode })}
                value={form.darkMode} />
            </View>
            <View style={styles.row}>
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
              style={styles.row}>
              <Text style={styles.rowLabel}>About Us</Text>
              <View style={styles.rowSpacer} />
              
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleContactUsWebsite}
              style={styles.row}>
              <Text style={styles.rowLabel}>Contact Us</Text>
              <View style={styles.rowSpacer} />
            
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              <Text style={styles.rowLabel}>Clear all data</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}