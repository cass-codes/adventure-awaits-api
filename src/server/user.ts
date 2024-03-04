import { dayZeroQuests } from "../data/data/Day0";
import { User } from "../shared/types/User";

export let user: User = {
  quests: dayZeroQuests,
  coins: 10,
  pennies: 0,
  stats: {
    goodness: 0,
    sneakiness: 0,
    cleverness: 0,
    brawn: 0,
    magic: 0,
    charm: 0,
  },
  relationships: {},
  skills: [],
};
