import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

export const UserInfoTopBar = ({
  profilePicIndex,
  totalProfilePics,
}: {
  profilePicIndex: number;
  totalProfilePics: number;
}) => {
  const insets = useSafeAreaInsets();

  return (
    <BlurView
      intensity={10}
      tint="default"
      style={[styles.topBar, { paddingTop: insets.top }]}
    >
      <View style={styles.pointsContainer}>
        <Image
          source={require("../../assets/images/pfp-1.jpg")}
          style={styles.pointsIcon}
        />
        <View style={styles.pointsTextContainer}>
          <Text style={styles.pointsTextTop}>Spend</Text>
          <Text style={styles.pointsTextBottom}>122 Points</Text>
        </View>
      </View>
      <View style={styles.postIndicatorContainer}>
        <Text style={styles.postIndicator}>
          {profilePicIndex + 1} / {totalProfilePics}
        </Text>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  postIndicatorContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  postIndicator: {
    color: "white",
    fontWeight: "bold",
  },
  pointsContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  pointsTextContainer: {},
  pointsIcon: {
    width: 40,
    height: 40,
    marginRight: 6,
    borderRadius: 90,
  },
  pointsTextTop: {
    color: "white",
    fontSize: 12,
  },
  pointsTextBottom: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
