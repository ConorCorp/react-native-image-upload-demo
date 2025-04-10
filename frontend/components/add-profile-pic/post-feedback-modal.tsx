import React from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import Button from "@/components/button";
import { router } from "expo-router";

interface PostFeedbackModalProps {
  visible: boolean;
  success: boolean;
  onClose: () => void;
}

export default function PostFeedbackModal({
  visible,
  success,
  onClose,
}: PostFeedbackModalProps) {
  const goToHome = () => {
    onClose();
    router.replace("/");
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>
            {success
              ? "Uploaded Profile Pic Successfully!"
              : "Profile Pic Upload Failed!"}
          </Text>
          {success && (
            <Text style={styles.modalSubtitle}>
              Upon successful moderation your post will be posted.
            </Text>
          )}
          <View style={styles.modalButtonsContainer}>
            <Button
              variant="filled"
              label="Back Home"
              color="#BDEE63"
              onPress={goToHome}
              style={styles.modalButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "85%",
    backgroundColor: "black",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#BDEE63",
  },
  modalTitle: {
    color: "#BDEE63",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  modalSubtitle: {
    color: "white",
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  modalButtonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
  },
  modalButton: {
    minWidth: 120,
    justifyContent: "center",
    alignItems: "center",
  },
});
