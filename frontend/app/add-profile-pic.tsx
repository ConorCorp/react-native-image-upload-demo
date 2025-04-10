import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MainBg from "@/components/main-bg";
import CameraView from "@/components/add-profile-pic/camera-view";
import PrePostControls from "@/components/add-profile-pic/pre-post-controls";
import Button from "@/components/button";
import { uploadProfilePic } from "@/lib/api-calls/profile-pics";
import PostFeedbackModal from "@/components/add-profile-pic/post-feedback-modal";

export default function AddProfilePic() {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      aspect: [3, 4],
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const cancelPost = () => {
    setImage(null);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const submitProfilePic = async () => {
    if (image) {
      setUploading(true);
      const success = await uploadProfilePic(image);
      setUploadSuccess(success);
      setImage(null);
      setUploading(false);
      setShowModal(true);

      if (success) {
        console.log("Profile Pic submitted");
      } else {
        console.log("Profile Pic submission failed");
      }
    }
  };

  return (
    <>
      <MainBg
        childrenTop={
          <>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>

            {!image ? (
              <CameraView />
            ) : (
              <ImageBackground
                source={{ uri: image.uri }}
                resizeMode="cover"
                style={styles.backgroundImage}
                imageStyle={{
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                }}
              ></ImageBackground>
            )}
          </>
        }
        childrenBottom={
          !image ? (
            <PrePostControls pickImage={pickImage} />
          ) : (
            <View style={styles.buttonContainer}>
              {uploading ? (
                <>
                  <ActivityIndicator size="small" color="#BDEE63" />
                  <Text style={styles.uploadingText}>Uploading...</Text>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    label="Cancel"
                    color="#BDEE63"
                    onPress={cancelPost}
                  />
                  <Button
                    variant="filled"
                    label="Post"
                    color="#BDEE63"
                    onPress={submitProfilePic}
                  />
                </>
              )}
            </View>
          )
        }
      />
      <PostFeedbackModal
        visible={showModal}
        success={uploadSuccess}
        onClose={closeModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8, // gap-x-4
    paddingVertical: 24, // py-6
  },
  uploadingText: {
    color: "#BDEE63",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 75,
    left: 8,
    zIndex: 10,
    borderRadius: 20,
    padding: 8,
  },
});
