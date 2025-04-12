import { ImagePickerAsset } from "expo-image-picker";
import { GetProfilePicsSchema, ProfilePics } from "@/lib/api-calls/utils/zod";
import { getFormDataFromImage } from "@/lib/api-calls/utils/helpers";

const backendUrl =
  (process.env.EXPO_PUBLIC_BACKEND_URL as string) + "/api/profile-pics";

const headersWithAuth: RequestInit = {
  headers: {
    Authorization: "cool-secret",
  },
};

export const getProfilePics = async (): Promise<ProfilePics> => {
  const response = await fetch(backendUrl, headersWithAuth);
  const responseJson = await response.json();
  return GetProfilePicsSchema.parse(responseJson);
};

export const uploadProfilePic = async (image: ImagePickerAsset) => {
  try {
    const fileFormData = await getFormDataFromImage(image);

    const response = await fetch(backendUrl, {
      ...headersWithAuth,
      method: "POST",
      body: fileFormData,
    });

    if (!response.ok) {
      throw new Error(`Error uploading file: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};
