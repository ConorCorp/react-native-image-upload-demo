import { LinearGradient } from "expo-linear-gradient";
import { Camera } from "lucide-react-native";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { View } from "react-native";

export default function PrePostControls({
  pickImage,
}: {
  pickImage: () => void;
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={require("@/assets/images/pfp-1.jpg")}
          style={{ width: 60, height: 60, borderRadius: 5 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={pickImage}>
        <LinearGradient
          style={styles.cameraButton}
          colors={["#BDEE63", "#9FD943", "#D8F799"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Camera style={{ width: 40, height: 40 }} color="black" />
        </LinearGradient>
      </TouchableOpacity>
      <View style={{ width: 60, height: 60 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  cameraButton: {
    width: 65,
    height: 65,
    borderRadius: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
