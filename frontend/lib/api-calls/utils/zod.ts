import { z } from "zod";

export const GetProfilePicsSchema = z
  .object({
    id: z.number(),
    publicUrl: z.string(),
  })
  .array();

export type ProfilePics = z.infer<typeof GetProfilePicsSchema>;
