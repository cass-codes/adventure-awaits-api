import { ScreenFunction } from "../../app/modules/screens/service/types";

export interface Screen {
  _id: string;
  header: string;
  main: MainContentProps;
  choiceInformation: ChoiceInfo;
}

// Main

export interface PictureMain {
  url: string;
  alt: string;
  side: "left" | "right";
  sideText: string[];
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

export type EvaluatedChoiceOption =
  | ScreenChoiceOption
  | SaveChoiceOption
  | InputChoiceOption
  | QuitChoiceOption;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ChoiceOption = EvaluatedChoiceOption | ScreenFunction;
