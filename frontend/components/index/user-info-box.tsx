import { BlurView } from "expo-blur";
import { View, StyleSheet } from "react-native";

export const UserInfoBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.borderRadiusOverride}>
      <BlurView style={styles.UserInfoContentMain} intensity={60} tint="dark">
        {children}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  // Fix border radius on BlurView https://github.com/expo/expo/issues/18615
  borderRadiusOverride: {
    borderRadius: 20,
    width: "100%",
    overflow: "hidden",
  },
  UserInfoContentMain: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
