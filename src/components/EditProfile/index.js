import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons'
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import FeatherIcon from 'react-native-vector-icons/Feather';



export default function EditProfile({ route, navigation }) {
 // const { name, address, profileImage} = route.params;

 const [profilePhoto, setProfilePhoto] = useState(null);

 const handleChoosePhoto = async () => {
   const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

   if (permissionResult.granted === false) {
     Alert.alert('Permission to access camera roll is required!');
     return;
   }

   const pickerResult = await ImagePicker.launchImageLibraryAsync();
   
   if (pickerResult.canceled === true) {
     return;
   }

   setProfilePhoto(pickerResult.uri);
 };

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionic name='chevron-back-outline' style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.editProfileText}>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </View>
    </View>
    <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Image
            style={styles.profileImage}
            source={profilePhoto ? { uri: profilePhoto } : {
              uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
          />
             <TouchableOpacity
                onPress={() => {
                  handleChoosePhoto
                }}>
                <View style={styles.profileAction}>
                  <FeatherIcon
                    color="#fff"
                    name="edit-3"
                    size={18} />
                </View>
              </TouchableOpacity>
        </TouchableOpacity>
      </View>
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter your name'
        defaultValue='John Doe'
      />
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter your address'
        defaultValue='123 Maple Street. London, ON N6U 6T5'
      />
    </View>
    <TouchableOpacity style={styles.saveButton} onPress={() => { /* Add your save functionality here */ }}>
      <Text style={styles.saveButtonText}>Save</Text>
    </TouchableOpacity>
  </View>
);
};


