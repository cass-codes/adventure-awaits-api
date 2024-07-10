import { startingMorningScreens } from "./morning";
import { screens as morningQuestScreens } from "./morningQuestScreens";
import { screens as marketplaceScreens } from "./marketplace";
import { Screen } from "../../../app/modules/screens/service/types";

export const day1Screens: Record<string, Screen> = {
  ...startingMorningScreens,
  ...morningQuestScreens,
  ...marketplaceScreens,
};
