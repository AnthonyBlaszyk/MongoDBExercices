import * as mongo from "mongodb";

export const artistValidator = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "firstName", "lastName", "albums", "songs"],
      additionalProperties: false,
      properties: {
        _id: { bsonType: "objectId" },
        firstName: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        lastName: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        albums: {
          bsonType: "array",
          description: "must be an array and is required",
        },
        songs: {
          bsonType: "array",
          description: "must be an array and is required",
        },
      },
    },
  },
};

export function createArtistsCollection(db: mongo.Db): Promise<mongo.Collection> {
  return db.createCollection("artists", artistValidator);
}
