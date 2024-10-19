import { Types } from "mongoose";
import { Character, TavernEnum } from "../../../../shared/types/Character";
import { Relationship } from "../../../../shared/types/Relationship";

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
  updatedAt: Date;
  createdAt: Date;
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
    relationships?: Relationship[];
    motivations?: string[];
  };
}

export interface SaveValues {
  savePath: string;
  saveValue: string;
}
