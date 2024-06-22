import { Schema, Types, model } from "mongoose";

const StoreSchema = new Schema({
  _id: Types.ObjectId,
  gameId: Types.ObjectId, // references to Game._id
  displayName: String,
  inventory: [
    {
      // the first inventory
      found: Boolean,
      items: [Types.ObjectId], // reference to _id of Items
    },
  ],
  owner: Types.ObjectId, //DialogueNPC._id;
});

export const StoreModel = model("stores", StoreSchema);
