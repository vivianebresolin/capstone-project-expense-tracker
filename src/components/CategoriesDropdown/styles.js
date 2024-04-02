import { Platform, StyleSheet } from "react-native";

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingVertical: isAndroid ? 0 : 10,
    paddingHorizontal: 104,
    backgroundColor: '#E2E2E2',
    borderRadius: isAndroid ? 10 : 8
  },
});

export default styles;