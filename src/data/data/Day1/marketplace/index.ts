import { Screen } from "../../../../app/modules/screens/service/types";
import { screens as originalMarketplaceScreens } from "./marketplace";
import { screens as exploreTheShopsScreens } from "./exploreTheShops";

export const screens: Record<string, Screen> = {
  ...originalMarketplaceScreens,
  ...exploreTheShopsScreens,
};
