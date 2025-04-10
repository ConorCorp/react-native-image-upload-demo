import { randomUUIDv7, s3 } from "bun";
import db from "./db";
import Busboy, { type BusboyHeaders } from "@fastify/busboy";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import type { ProfilePic } from "../profile-pic.type";

const isNotAuthorized = (req: Request) => {
  if (req.headers.get("Authorization") !== "cool-secret") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
};

const getS3RelativePath = (fileName: string) => {
  return `${process.env.AWS_BUCKET_UPLOAD_PATH}/${fileName}`;
};

const getS3PublicUrl = (fileName: string) => {
  return `https://${process.env.AWS_BUCKET}.s3.${
    process.env.AWS_REGION
  }.amazonaws.com/${getS3RelativePath(fileName)}`;
};

const server = Bun.serve({
  port: 3000,
  routes: {
    "/api/profile-pics": {
      POST: async (req: Request) => {
        const unauthorizedResponse = isNotAuthorized(req);
        if (unauthorizedResponse) return unauthorizedResponse;

        const busboy = new Busboy({
          headers: req.headers.toJSON() as BusboyHeaders,
        });

        let profilePicResponse: ProfilePic | undefined;
        let fileParsingPromise: Promise<void>;
        let finishFileParsingPromise: () => void;

        fileParsingPromise = new Promise((resolve) => {
          finishFileParsingPromise = resolve;
        });

        busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
          const unqiueFileName = randomUUIDv7();
          const s3file = s3.file(getS3RelativePath(unqiueFileName));
          const s3writer = s3file.writer({ type: mimetype });

          file.on("data", async (data) => {
            await s3writer.write(data);
          });

          file.on("end", async () => {
            s3writer.end();
            profilePicResponse = {
              id: db.data.ProfilePics.length + 1,
              publicUrl: getS3PublicUrl(unqiueFileName),
            };
            await db.update(({ ProfilePics }) =>
              ProfilePics.push(profilePicResponse as ProfilePic)
            );
            finishFileParsingPromise();
            console.log(`ProfilePic created: ${profilePicResponse.id}`);
          });
        });

        if (req.body) {
          await pipeline(Readable.fromWeb(req.body), busboy);
          await fileParsingPromise;
          return Response.json(profilePicResponse);
        }

        return Response.json({
          message: "No file provided",
        });
      },
      GET: async (req) => {
        const unauthorizedResponse = isNotAuthorized(req);
        if (unauthorizedResponse) return unauthorizedResponse;

        return Response.json(db.data.ProfilePics);
      },
    },
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
