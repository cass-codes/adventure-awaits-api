import { ScreenFunction } from "../../app/modules/screens/service/types";

export interface Screen {
  _id: string;
  header: string;
  main: MainContentProps | EvaluatedMainContentProps;
  choiceInformation: ChoiceInfo;
}

export interface EvaluatedScreen {
  _id: string;
  header: string;
  main: EvaluatedMainContentProps;
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

export type EvaluatedMainContentProps = (string | PictureMain)[];

export function isEvaluatedMainContentProps(
  main: MainContentProps
): main is EvaluatedMainContentProps {
  return (main as EvaluatedMainContentProps).every(
    (line) => typeof line === "string" || isPictureMain(line)
  );
}

// Choices

export interface ChoiceInfo {
  text: string;
  options: ChoiceOption[] | ScreenFunction;
}

export interface EvaluatedChoiceInfo {
  text: string;
  options: EvaluatedChoiceOption[];
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

export type EvaluatedChoiceOption =
  | ScreenChoiceOption
  | SaveChoiceOption
  | InputChoiceOption
  | QuitChoiceOption;

export function isEvaluatedChoiceOption(
  option: ChoiceOption
): option is EvaluatedChoiceOption {
  return (
    (option as EvaluatedChoiceOption).optionText !== undefined &&
    typeof option !== "function"
  );
}

export type ChoiceOption = EvaluatedChoiceOption | ScreenFunction;

export type FunctionProperties =
  | EvaluatedChoiceOption
  | EvaluatedChoiceOption[]
  | EvaluatedMainContentProps
  | string
  | PictureMain;
