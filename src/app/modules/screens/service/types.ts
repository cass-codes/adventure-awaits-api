import { FunctionProperties } from "../../../../shared/types/Screen";
import { Game } from "../../games/service/types";

export type ScreenFunction = (game: Game) => FunctionProperties;

export function isScreenFunction(fn: unknown): fn is ScreenFunction {
  return typeof fn === "function" && fn.length === 1;
}
