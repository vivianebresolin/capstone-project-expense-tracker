import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import styles from "./styles";

export default function FloatingButton({ onPress, iconName }) {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
      <AntDesign name={iconName} size={30} color="black" />
    </TouchableOpacity>
  );
}