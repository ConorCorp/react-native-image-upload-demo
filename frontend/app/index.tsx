import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "@/components/logo";
import { Link } from "expo-router";
import MainBg from "@/components/main-bg";
import { getProfilePics } from "@/lib/api-calls/profile-pics";
import { useState, useEffect, useRef } from "react";
import { ProfilePics } from "@/lib/api-calls/utils/zod";
import PagerView from "react-native-pager-view";
import { UserInfo } from "@/components/index/user-info";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const [profilePics, setProfilePics] = useState<ProfilePics>([]);
  const [loading, setLoading] = useState(true);
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchProfilePics = async () => {
      try {
        const profilePics = await getProfilePics();
        const reversedProfilePics = [...profilePics].reverse();
        setProfilePics(reversedProfilePics);
      } catch (error) {
        console.error("Error fetching profile pics:", error);
      }
      setLoading(false);
    };
    fetchProfilePics();
  }, []);

  const handlePageChange = (e: any) => {
    setCurrentPage(e.nativeEvent.position);
  };

  return (
    <MainBg
      childrenTop={
        profilePics.length > 0 ? (
          <View style={styles.pageContainer}>
            <PagerView
              ref={pagerRef}
              style={styles.pagerView}
              initialPage={0}
              onPageSelected={handlePageChange}
            >
              {profilePics.map((profilePic) => (
                <View key={profilePic.id} style={styles.pageContainer}>
                  <ImageBackground
                    src={profilePic.publicUrl}
                    resizeMode="cover"
                    style={styles.backgroundImage}
                    imageStyle={{
                      borderBottomLeftRadius: 30,
                      borderBottomRightRadius: 30,
                    }}
                  />
                </View>
              ))}
            </PagerView>
            <View style={styles.userInfoOverlay} pointerEvents="none">
              <UserInfo
                profilePicIndex={currentPage}
                totalProfilePics={profilePics.length}
              />
            </View>
          </View>
        ) : loading ? (
          <View style={styles.noPostsContainer}>
            <ActivityIndicator size="large" color="#BDEE63" />
            <Text style={styles.noPostsText}>Getting posts...</Text>
          </View>
        ) : (
          <View style={styles.noPostsContainer}>
            <Text style={styles.noPostsText}>No posts yet :/</Text>
          </View>
        )
      }
      childrenBottom={
        <View style={styles.buttonsContainer}>
          <LinearGradient
            style={[styles.gradientButton, { width: 40, height: 40 }]}
            colors={["#BDEE63", "#9FD943", "#D8F799"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="settings-outline" size={20} color="black" />
          </LinearGradient>
          <Link href="/add-profile-pic">
            <LinearGradient
              style={styles.gradientButton}
              colors={["#BDEE63", "#9FD943", "#D8F799"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.gradientButtonContent}>
                <Logo style={{ width: 40, height: 40 }} />
              </View>
            </LinearGradient>
          </Link>
          <View style={[styles.gradientButton, { width: 40, height: 40 }]}>
            <Ionicons name="chatbubble-outline" size={30} color="#BDEE63" />
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  gradientButton: {
    width: 65,
    height: 65,
    borderRadius: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  gradientButtonContent: {
    width: 60,
    height: 60,
    borderRadius: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  noPostsContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    backgroundColor: "#1F2937",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    gap: 10,
  },
  noPostsText: {
    color: "white",
    fontSize: 20,
  },
  pagerView: {
    width: "100%",
    height: "100%",
  },
  pageContainer: {
    width: "100%",
    height: "100%",
  },
  userInfoOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: "hidden",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: "100%",
  },
});
