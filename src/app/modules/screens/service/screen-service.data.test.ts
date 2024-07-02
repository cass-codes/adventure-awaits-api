import {
  RelationshipEnum,
  UserClass,
} from "../../../../shared/types/Character";
import { Game } from "../../games/service/types";

export const testGame: Game = {
  _id: "0",
  userId: "0",
  quests: [],
  day: 0,
  screenId: "0",
  character: {
    name: "Adventurer",
    class: UserClass.Bard,
    stats: {
      goodness: 5,
      sneakiness: 0,
      cleverness: 0,
      brawn: 5,
      magic: 0,
      charm: 0,
    },
    money: {
      gold: 100,
      pennies: 44,
    },
    relationships: [
      {
        name: RelationshipEnum.Lyra,
        dayMet: 0,
        relationshipValue: 1,
      },
    ],
  },
};
