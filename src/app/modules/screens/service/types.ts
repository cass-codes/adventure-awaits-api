import { Game } from "../../games/service/types";

export type ScreenFunction = (game: Game) => string | any; // TODO fix

export function isScreenFunction(fn: unknown): fn is ScreenFunction {
  return typeof fn === "function" && fn.length === 1;
}
