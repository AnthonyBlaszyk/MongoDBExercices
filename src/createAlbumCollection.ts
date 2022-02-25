import * as mongo from "mongodb";

export const albumValidator = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "title", "artist", "realeaseYear", "songs"],
      additionalProperties: false,
      properties: {
        _id: { bsonType: "objectId" },
        title: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        artist: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        realeaseYear: {
          bsonType: "int",
          description: "must be an int and is required",
        },
        songs: {
          bsonType: "array",
        },
      },
    },
  },
};

export function createAlbumCollection(db: mongo.Db): Promise<mongo.Collection> {
  return db.createCollection("album", albumValidator);
}
