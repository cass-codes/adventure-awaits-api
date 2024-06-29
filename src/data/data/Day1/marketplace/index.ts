import { Screen } from "../../../../shared/types/Screen";
import { screens as originalMarketplaceScreens } from "./marketplace";
import { screens as exploreTheShopsScreens } from "./exploreTheShops";

export const screens: Record<string, Screen> = {
  ...originalMarketplaceScreens,
  ...exploreTheShopsScreens,
};
