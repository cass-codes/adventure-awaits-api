import { Types } from "mongoose";
import { RelationshipEnum, UserClass } from "./Character";
import { Quest } from "./Quest";

interface Stats {
  goodness: number;
  cleverness: number;
  sneakiness: number;
  brawn: number;
  magic: number;
  charm: number;
}

export interface Relationship {
  dayMet: number;
  relationshipValue: number;
}

export interface Game {
  _id: Types.ObjectId;
  screenId: string;
  characterId: string;
}
