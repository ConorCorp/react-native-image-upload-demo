import { View, Text, StyleSheet } from "react-native";

export default function CameraView() {
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        },
      ]}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Camera View</Text>
        <Text style={styles.subtitle}>Not operational on simulator!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1F2937", // bg-gray-800
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8, // gap-y-2
  },
  title: {
    color: "white",
    fontSize: 48, // text-5xl
    fontWeight: "bold",
  },
  subtitle: {
    color: "white",
    fontSize: 18, // text-lg
    fontWeight: "bold",
    textAlign: "center",
  },
});
