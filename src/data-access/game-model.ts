import { Schema, Types, model } from "mongoose";

const GameSchema = new Schema({
  _id: Types.ObjectId,
  screenId: String,
  characterName: String,
  class: String, // enum of UserClass
  stats: {
    goodness: Number, // min of -5, max of 5
    cleverness: Number, // min of -5, max of 5
    sneakiness: Number, // min of -5, max of 5
    brawn: Number, // min of -5, max of 5
    magic: Number, // min of -5, max of 5
    charm: Number, // min of -5, max of 5
  },
  money: {
    gold: Number,
    pennies: Number,
  },
  inventory: [Types.ObjectId], // reference to _id of Items
  relationships: {
    type: Map,
    of: {
      dayMet: Number, // the number of the day that the user met the person
      relationshipValue: Number, // how good of friends are they?
    },
    default: {},
  },
  quests: {
    type: Array,
    of: Object,
    default: [],
  },
});

export const GameModel = model("games", GameSchema);
