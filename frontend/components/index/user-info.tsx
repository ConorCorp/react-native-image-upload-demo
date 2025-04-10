import { View, StyleSheet, Text } from "react-native";
import { UserInfoTopBar } from "@/components/index/user-info-top-bar";
import { UserInfoBox } from "@/components/index/user-info-box";
import { UserInfoChip } from "@/components/index/user-info-chip";

export const UserInfo = ({
  profilePicIndex,
  totalProfilePics,
}: {
  profilePicIndex: number;
  totalProfilePics: number;
}) => {
  return (
    <View style={[styles.container]}>
      <UserInfoTopBar
        profilePicIndex={profilePicIndex}
        totalProfilePics={totalProfilePics}
      />
      <View style={styles.UserInfoContent}>
        <UserInfoBox>
          <View style={styles.UserInfoContentMainTextContainer}>
            <Text style={styles.UserInfoContentMainText}>Maya Fox</Text>
          </View>
          <View
            style={[
              styles.UserInfoContentMainTextContainer,
              {
                borderTopWidth: 2,
                borderBottomWidth: 2,
                borderColor: "rgba(255, 255, 255, 0.1)",
              },
            ]}
          >
            <Text style={styles.UserInfoContentSecondaryTextHeader}>Age</Text>
            <Text style={styles.UserInfoContentSecondaryText}>23</Text>
          </View>
          <View style={styles.UserInfoContentMainTextContainer}>
            <Text style={styles.UserInfoContentSecondaryTextHeader}>
              Location
            </Text>
            <Text style={styles.UserInfoContentSecondaryText}>
              Brooklyn, NY
            </Text>
          </View>
        </UserInfoBox>
        <UserInfoBox>
          <View style={styles.HobbyContentContainer}>
            <UserInfoChip icon="airplane" text="Travelling" />
            <UserInfoChip icon="water" text="Swimming" />
            <UserInfoChip icon="paw" text="Dogs" />
            <UserInfoChip icon="musical-notes" text="Music" />
            <UserInfoChip icon="game-controller" text="Gaming" />
          </View>
        </UserInfoBox>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  UserInfoContent: {
    width: "100%",
    height: "100%",
    borderRadius: 90,
    paddingTop: 40,
    overflow: "scroll",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 16,
    marginTop: 120,
  },
  // Fix border radius on BlurView https://github.com/expo/expo/issues/18615
  borderRadiusOverride: {
    borderRadius: 20,
    width: "100%",
    overflow: "hidden",
  },
  UserInfoContentMainTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 90,
    width: "100%",
    gap: 8,
  },
  UserInfoContentMainText: {
    fontSize: 24,
    color: "white",
    letterSpacing: 1,
  },
  UserInfoContentSecondaryText: {
    fontSize: 20,
    color: "white",
  },
  UserInfoContentSecondaryTextHeader: {
    fontSize: 16,
    color: "#9CA2A5",
  },
  HobbyContentContainer: {
    width: "75%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    flexWrap: "wrap",
    marginVertical: 32,
  },
});
