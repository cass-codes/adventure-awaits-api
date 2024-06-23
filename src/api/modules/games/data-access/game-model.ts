import { Schema, Types, model } from "mongoose";

const statsSchema = {
  type: Number,
  $gte: -5,
  $lte: 5,
};

const CharacterSchema = {
  characterName: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
    enum: ["warrior", "mage", "rogue", "bard"], // TODO make real enum
  },
  stats: {
    goodness: statsSchema,
    cleverness: statsSchema,
    sneakiness: statsSchema,
    brawn: statsSchema,
    magic: statsSchema,
    charm: statsSchema,
  },
  money: {
    gold: {
      type: Number,
      default: 0,
    },
    pennies: {
      type: Number,
      default: 0,
    },
  },
  inventory: {
    type: Array,
    items: {
      type: Types.ObjectId,
    },
    default: [],
  },
  relationships: {
    type: Array,
    of: {
      dayMet: Number, // the number of the day that the user met the person
      relationshipValue: Number, // how good of friends are they?
    },
    default: [],
  },
};

const GameSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    required: true,
  },
  character: CharacterSchema,
  screenId: {
    type: String,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  quests: {
    type: Array,
    items: {
      type: Object,
    },
    default: [],
  },
});

export const GameModel = model("games", GameSchema);
