import * as mongo from "mongodb";

export function createArtist(db: mongo.Db, firstName: string, lastName: string) {
  return db.collection("artists").insertOne({
    firstName: firstName,
    lastName: lastName,
    songs: [],
    albums: [],
  });
}

export function createSong(db: mongo.Db, title: string, releaseYear: number, artistLastName: string) {
  return db
    .collection("artists")
    .findOne({ lastName: artistLastName })
    .then((result) => {
      return {
        title: title,
        artist: result?._id,
        releaseYear: releaseYear,
        album: [],
      };
    })
    .then((resultSong) => {
      return db.collection("songs").insertOne(resultSong);
    })
    .then(async (newId) => {
      return db.collection("artists").updateOne({ lastName: artistLastName }, { $push: { songs: newId.insertedId } });
    });
}
