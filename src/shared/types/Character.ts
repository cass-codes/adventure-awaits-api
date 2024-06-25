import { Relationship } from "./Relationship";

export enum Tavern {
  TheRustySword = "The Rusty Sword",
  TheSilverSpoon = "The Silver Spoon",
  SewerWater = "Sewer Water",
}

export enum UserClass {
  bard = "Bard",
  fighter = "Fighter",
  mage = "Mage",
}

export enum Motivations {
  money = "money",
  power = "power",
  knowledge = "knowledge",
  safety = "safety",
  revenge = "revenge",
  adventure = "adventure",
}

export enum RelationshipEnum {
  Lyra = "Lyra",
  Hunstan = "Hunstan",
  Kael = "Kael",
  Somerild = "Somerild",
  Serena = "Serena",
  Kiirion = "Kiirion",
}

export enum Stat {
  goodness = "goodness",
  sneakiness = "sneakiness",
  cleverness = "cleverness",
  brawn = "brawn",
  magic = "magic",
  charm = "charm",
}

export interface Character {
  // _id: string;
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
  // motivations?: Motivations[];
  relationships?: {
    Lyra?: Relationship;
    Hunstan?: Relationship;
    Kael?: Relationship;
    Somerild?: Relationship;
    Serena?: Relationship;
    Kiirion?: Relationship;
  };
  // skills: string[];
  // tavern?: Tavern;
}
