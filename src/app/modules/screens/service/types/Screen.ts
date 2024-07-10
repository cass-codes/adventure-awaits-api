import { Game } from "../../../games/service/types";
import {
  EvaluatedChoiceOption,
  EvaluatedMainContentProps,
} from "./EvaluatedScreen";

export interface Screen {
  _id: string;
  header: string;
  main: MainContentProps | EvaluatedMainContentProps;
  choiceInformation: ChoiceInfo;
}

// Main

export interface PictureMain {
  url: string;
  alt: string;
  side: "left" | "right";
  sideText: string[];
}

export function isPictureMain(main: string | PictureMain): main is PictureMain {
  return (main as PictureMain).url !== undefined;
}

export type MainContentProps = (string | PictureMain | ScreenFunction)[];

// Choices

export interface ChoiceInfo {
  text: string;
  options: ChoiceOption[] | ScreenFunction;
}

interface BaseChoiceOption {
  optionText: string;
  screenId: string | ScreenFunction;
}

export interface ScreenChoiceOption extends BaseChoiceOption {
  type: "screen";
}

export interface SaveChoiceOption extends BaseChoiceOption {
  type: "save";
  saveValues: {
    savePath: string;
    saveValue: string;
  }[];
}

export interface InputChoiceOption extends BaseChoiceOption {
  type: "input";
  savePath: string;
}

export interface QuitChoiceOption extends BaseChoiceOption {
  type: "quit";
}

export type ChoiceOption = EvaluatedChoiceOption | ScreenFunction;

export type FunctionProperties =
  | EvaluatedChoiceOption
  | EvaluatedChoiceOption[]
  | EvaluatedMainContentProps
  | string
  | PictureMain;

export type ScreenFunction = (game: Game) => FunctionProperties;

export function isScreenFunction(fn: unknown): fn is ScreenFunction {
  return typeof fn === "function" && fn.length === 1;
}
