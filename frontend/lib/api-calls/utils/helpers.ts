import { ImagePickerAsset } from "expo-image-picker";

export const getFormDataFromImage = async (image: ImagePickerAsset) => {
  const formData = new FormData();

  // @ts-expect-error: special react native format for form data
  formData.append(`file`, {
    uri: image.uri,
    name: image.fileName ?? image.uri.split("/").pop(),
    type: image.mimeType,
  });

  return formData;
};
