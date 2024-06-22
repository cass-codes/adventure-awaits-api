import { Schema, Types, model } from "mongoose";

const ItemSchema = new Schema({
  _id: Types.ObjectId,
  displayName: String,
  cost: {
    gold: Number,
    pennies: Number,
  },
});

export const ItemModel = model("items", ItemSchema);
