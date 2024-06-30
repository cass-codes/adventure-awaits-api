import { Model, Schema, Types, model } from "mongoose";
import { TavernEnum, UserClass } from "../../../../shared/types/Character";
import { GameDocument } from "../service/types";

const statsSchema = {
  default: 0,
  type: Number,
  $gte: -5,
  $lte: 5,
};

const CharacterSchema = {
  name: {
    type: String,
  },
  class: {
    type: String,
    enum: UserClass,
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
      default: 10,
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
  motivations: {
    type: Array,
    items: {
      type: String,
    },
    default: [],
  },
};

const GameSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    required: true,
  },
  userId: {
    type: String,
    required: false,
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
  tavern: {
    type: String,
    enum: TavernEnum,
  },
});

export const GameModel = model<GameDocument, Model<GameDocument>>(
  "games",
  GameSchema
);
