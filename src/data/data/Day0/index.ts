import { buildingCharacterScreens } from "./buildingCharacter";
import { findAnInnScreens } from "./findAnInn";
import { Screen } from "../../../shared/types/Screen";

export { dayZeroQuests } from "./quests";
export const day0Screens: Record<string, Screen> = {
  ...buildingCharacterScreens,
  ...findAnInnScreens,
};
