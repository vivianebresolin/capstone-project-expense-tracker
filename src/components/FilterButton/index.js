import { Pressable, Text } from "react-native";
import styles from "./styles";

export default function FilterButton({ title, onPress, isSelected }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.wrapper,
        isSelected ? styles.selectedButton : styles.unselectedButton,
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};