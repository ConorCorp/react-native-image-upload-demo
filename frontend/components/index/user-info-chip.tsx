import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

export const UserInfoChip = ({
  icon,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}) => {
  return (
    <View style={styles.HobbyContentItem}>
      <Ionicons name={icon} size={16} color="white" />
      <Text style={styles.HobbyContentItemText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  HobbyContentItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 90,
  },
  HobbyContentItemText: {
    fontSize: 12,
    color: "white",
  },
});
