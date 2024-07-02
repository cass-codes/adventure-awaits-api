import { Relationship } from "./Relationship";

export enum TavernEnum {
  TheRustySword = "The Rusty Sword",
  TheSilverSpoon = "The Silver Spoon",
  SewerWater = "Sewer Water",
}

export enum UserClass {
  Bard = "Bard",
  Fighter = "Fighter",
  Mage = "Mage",
}

export enum MotivationEnum {
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
  motivations?: MotivationEnum[];
  relationships?: Relationship[];
  // skills: string[];
  // tavern?: Tavern;
}
