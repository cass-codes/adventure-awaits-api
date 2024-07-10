import { buildingCharacterScreens } from "./buildingCharacter";
import { findAnInnScreens } from "./findAnInn";
import { Screen } from "../../../app/modules/screens/service/types";

export { dayZeroQuests } from "./quests";
export const day0Screens: Record<string, Screen> = {
  ...buildingCharacterScreens,
  ...findAnInnScreens,
};
