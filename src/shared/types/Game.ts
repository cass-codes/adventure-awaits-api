import { Types } from "mongoose";
import { Relationship, UserClass } from "./User";
import { Quest } from "./Quest";

interface Stats {
  goodness: number;
  cleverness: number;
  sneakiness: number;
  brawn: number;
  magic: number;
  charm: number;
}

export interface Game {
  _id: Types.ObjectId;
  screenId: string;
  characterName: string;
  class?: UserClass;
  stats: Stats;
  money: {
    gold: number;
    pennies: number;
  };
  relationships: {
    Lyra?: number;
    Hunstan?: number;
    Kael?: number;
    Somerild?: number;
    Serena?: number;
    Kiirion?: number;
  };
  quests: { [key: string]: Quest };
}
