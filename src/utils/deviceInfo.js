import { Platform } from 'react-native';
import * as Application from 'expo-application';

export const getUniqueId = async () => {
  let id = '';

  if (Platform.OS === 'ios') {
    return id = await Application.getIosIdForVendorAsync();
  } else {
    return id = Application.androidId;
  }
}