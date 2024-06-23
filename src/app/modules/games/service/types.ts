import { UserClass } from "../../../../shared/types/Character";

interface NewCharacter {
  name?: string;
  class?: UserClass;
  stats: {
    goodness: number;
    sneakiness: number;
    cleverness: number;
    brawn: number;
    magic: number;
    charm: number;
  };
  money: {
    gold: number;
    pennies: number;
  };
}

export interface NewGame {
  userId?: string; // Keeping not required for now
  day: number;
  screenId: string;
  character: NewCharacter;
}

export interface Game extends NewGame {
  _id: string;
  quests: unknown[];
  inventory: unknown[];
  relationships: object;
}
