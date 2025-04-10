// import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import { Credentials } from "@aws-sdk/types";
// import { ImagePickerAsset } from "expo-image-picker";
// import "react-native-get-random-values";
// import "react-native-url-polyfill/auto";

// // Danger: This is a dangerous practice, do not use this in production
// const credentials: Credentials = {
//   accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID as string,
//   secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
// };

// const client = new S3Client({
//   region: process.env.EXPO_PUBLIC_AWS_REGION as string,
//   credentials: credentials,
// });

// const bucket = process.env.EXPO_PUBLIC_AWS_BUCKET_NAME as string;

// export const uploadFile = async (image: ImagePickerAsset) => {
//   try {
//     console.log(image.uri);
//     console.log("bucket", bucket);
//     const response = await client.send(
//       new PutObjectCommand({
//         Bucket: bucket,
//         Key: image.fileName as string,
//         Body: image.uri,
//       })
//     );
//     return response.$metadata.httpStatusCode === 200;
//   } catch (error) {
//     console.log("error", error);
//   }
// };
