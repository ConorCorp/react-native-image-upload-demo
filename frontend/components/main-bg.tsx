import { View, StyleSheet } from "react-native";

export default function MainBg({
  childrenTop,
  childrenBottom,
}: {
  childrenTop: React.ReactNode;
  childrenBottom: React.ReactNode;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>{childrenTop}</View>
      <View style={styles.bottomContainer}>{childrenBottom}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexShrink: 1,
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    height: "100%",
  },
  topContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  bottomContainer: {
    width: "100%",
    height: 160,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
});
