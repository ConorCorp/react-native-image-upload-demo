import { JSONFilePreset } from "lowdb/node";
import { type ProfilePic } from "../profile-pic.type";

const initDb = async () => {
  // Create db shape
  type Db = {
    ProfilePics: ProfilePic[];
  };

  // Read or create db.json
  const defaultData = { ProfilePics: [] };
  return JSONFilePreset<Db>("db.json", defaultData);
};

const db = await initDb();

export default db;
