import "dotenv/config";
import express from "express";
import nunjucks from "nunjucks";
import { MongoClient } from "mongodb";
// import { createArtist, createSong } from "./createSong";

const databaseUrl = process.env.MONGODB_DATABASE_URL || "";
const client = new MongoClient(databaseUrl);
const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use(express.static("public"));
app.set("view engine", "njk");

// Home page
app.get("/", (req, response) => {
  client.connect().then(async (client) => {
    const db = client.db();
    const artists = await db.collection("artists").find().toArray();

    response.render("home", { artists: artists });
  });
});

// Artist page
app.get("/artist/:slug", (req, response) => {
  const result = req.params.slug;

  client.connect().then(async (client) => {
    const db = client.db();
    const artist = await db.collection("artists").findOne({ lastName: result });
    if (artist) {
      const songs = await db
        .collection("songs")
        .find({ _id: { $in: artist.songs } })
        .toArray();
      console.log(songs);
      response.render("artistDetail", { artist: artist, songs: songs });
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
