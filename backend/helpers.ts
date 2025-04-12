export const isNotAuthorized = (req: Request) => {
  if (req.headers.get("Authorization") !== "cool-secret") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
};

export const getS3RelativePath = (fileName: string) => {
  return `${process.env.AWS_BUCKET_UPLOAD_PATH}/${fileName}`;
};

export const getS3PublicUrl = (fileName: string) => {
  return `https://${process.env.AWS_BUCKET}.s3.${
    process.env.AWS_REGION
  }.amazonaws.com/${getS3RelativePath(fileName)}`;
};
