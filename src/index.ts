import "dotenv/config";
import { MongoClient } from "mongodb";
import { createArtist, createSong } from "./createSong";

const databaseUrl = process.env.MONGODB_DATABASE_URL || "";
const client = new MongoClient(databaseUrl);

client.connect().then((client) => {
  const db = client.db();

  // createArtist(db, "Calliope", "Mori");
  createSong(db, "Nameless Sadness", 2021, "IRyS").then(() => {
    client.close();
  });
});
