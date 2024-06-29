import { cloneDeep } from "lodash";
import { dayZeroQuests } from "../data/data/Day0";
import { Quest, QuestStatus } from "../shared/types/Quest";
import {
  Motivations,
  RelationshipEnum,
  Stat,
  TavernEnum,
  UserClass,
} from "../shared/types/Character";
import { evalPlusMinusInput } from "./helper";
import { Relationship } from "../shared/types/Relationship";

class Character implements Character {
  _id: string = "";
  quests: { [key: string]: Quest } = {};
  motivations: Motivations[] = [];
  name = "";
  userClass?: UserClass;
  tavern?: TavernEnum;
  money = { gold: 10, pennies: 0 };
  stats = {
    goodness: 0,
    sneakiness: 0,
    cleverness: 0,
    brawn: 0,
    magic: 0,
    charm: 0,
  };
  relationships: {
    Lyra?: Relationship;
    Hunstan?: Relationship;
    Kael?: Relationship;
    Somerild?: Relationship;
    Serena?: Relationship;
    Kiirion?: Relationship;
  } = {};
  skills: string[] = [];

  constructor(user?: Character) {
    if (user) {
      Object.assign(this, cloneDeep(user));
    }
  }
}

const user = new Character();

export function updateMotivations(value: string) {
  const motives = user.motivations || [];
  const motive = value as Motivations;
  motives.push(Motivations[motive]);
  user.motivations = motives;
}

export function updateRelationship(value: string, _relationship: string) {
  const relationship = RelationshipEnum[_relationship as RelationshipEnum];
  let rel = user.relationships[relationship];
  if (rel === undefined) {
    rel = { dayMet: 0, relationshipValue: 0 }; // TODO: dayMet should be set to the current day
  }
  rel.relationshipValue += evalPlusMinusInput(value);
  user.relationships[relationship] = rel;
}

export function updateQuest(
  value: string,
  property1: string,
  property2?: string
) {
  const currentQuests = user.quests;
  const quest = currentQuests[value] || currentQuests[property1];
  if (!quest && !property2) {
    user.quests = { ...user.quests, [value]: dayZeroQuests[value] };
    user.quests[value].status = QuestStatus.active;
    return;
  }
  if (quest === undefined) {
    throw Error(`Quest not found: ${property1}`);
  }
  if (property2 === "status") {
    quest.status = value as QuestStatus;
  } else {
    throw Error(`Property not found: ${property2}`);
  }
}

export function updateSkills(value: string) {
  if (!user.skills.find((skill: string) => skill === value))
    user.skills.push(value);
}
