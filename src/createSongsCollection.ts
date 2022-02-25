import * as mongo from "mongodb";

export const songValidator = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "title", "artist", "releaseYear"],
      additionalProperties: false,
      properties: {
        _id: { bsonType: "objectId" },
        title: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        artist: {
          bsonType: "objectId",
          description: "must be a string and is required",
        },
        releaseYear: {
          bsonType: "int",
          description: "must be an int and is required",
        },
        album: {
          bsonType: "array",
        },
      },
    },
  },
};

export function createSongsCollection(db: mongo.Db): Promise<mongo.Collection> {
  return db.createCollection("songs", songValidator);
}
