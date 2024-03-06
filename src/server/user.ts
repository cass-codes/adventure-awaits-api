import { cloneDeep } from "lodash";
import { dayZeroQuests } from "../data/data/Day0";
import { Quest, QuestStatus } from "../shared/types/Quest";
import {
  Motivations,
  Relationship,
  Stat,
  Tavern,
  User,
  UserClass,
} from "../shared/types/User";
import { evalPlusMinusInput } from "./helper";

class Character implements User {
  quests: { [key: string]: Quest } = {};
  motivations: Motivations[] = [];
  name = "";
  userClass?: UserClass;
  tavern?: Tavern;
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
    Lyra?: number;
    Hunstan?: number;
    Kael?: number;
    Somerild?: number;
    Serena?: number;
    Kiirion?: number;
  } = {};
  skills: string[] = [];

  constructor(user?: User) {
    if (user) {
      Object.assign(this, cloneDeep(user));
    }
  }
}

let user = new Character();

export function getUser() {
  return user;
}

export function setUser(newUser: User) {
  user = new Character(newUser);
}

export function setName(name: string) {
  user.name = name;
}

export function setClass(userClass: string) {
  user.userClass = userClass as UserClass;
}

export function setCoins(value: string) {
  const changeVal = evalPlusMinusInput(value);
  const changeGold = changeVal % 1;
  const changePennies = changeVal - changeGold;
  user.money.gold += changeGold;
  user.money.pennies += changePennies;
  while (user.money.gold < 0) {
    user.money.gold += 1;
    user.money.pennies -= 20;
  }
}

export function setTavern(tavern: string) {
  user.tavern = tavern as Tavern;
}

export function updateStat(value: string, _stat: string) {
  const stat = Stat[_stat as Stat];
  const currentStat = user.stats[stat];
  user.stats[stat] = currentStat + evalPlusMinusInput(value);
}

export function updateMotivations(value: string) {
  const motives = user.motivations || [];
  const motive = value as Motivations;
  motives.push(Motivations[motive]);
  user.motivations = motives;
}

export function updateRelationship(value: string, _relationship: string) {
  const relationship = Relationship[_relationship as Relationship];
  let rel = user.relationships[relationship];
  if (rel === undefined) {
    rel = 0;
  }
  rel += evalPlusMinusInput(value);
  user.relationships[relationship] = rel;
}

export function updateQuest(
  value: string,
  property1: string,
  property2?: string
) {
  let currentQuests = user.quests;
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
