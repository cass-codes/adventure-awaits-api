import { Types } from "mongoose";
import { NewGame } from "../service/types";

export interface DbGame extends NewGame {
  _id: Types.ObjectId;
  quests: unknown[];
  inventory: unknown[];
  relationships: object;
}
