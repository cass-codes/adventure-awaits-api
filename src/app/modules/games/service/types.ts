import { Types } from "mongoose";
import { Character, TavernEnum } from "../../../../shared/types/Character";

export interface GameCreationProps {
  quests: unknown[];
  userId?: string; // Keeping not required for now
  day: number;
  screenId: string;
  character: Character;
  tavern?: TavernEnum;
}

export interface Game extends GameCreationProps {
  _id: string;
}

export interface GameDocument extends GameCreationProps {
  _id: Types.ObjectId;
}

export interface UpdateGame {
  day?: number;
  screenId?: string;
  character?: {
    stats?: {
      goodness?: number;
      cleverness?: number;
      sneakiness?: number;
      brawn?: number;
      magic?: number;
      charm?: number;
    };
    money?: {
      gold?: number;
      pennies?: number;
    };
    relationships?: object;
  };
}

export interface SaveValues {
  savePath: string;
  saveValue: string;
}
