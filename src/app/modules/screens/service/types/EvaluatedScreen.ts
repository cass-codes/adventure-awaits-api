import {
  type ChoiceInfo,
  type PictureMain,
  type MainContentProps,
  type ScreenChoiceOption,
  type SaveChoiceOption,
  type InputChoiceOption,
  type QuitChoiceOption,
  type ChoiceOption,
  isPictureMain,
} from "./Screen";

export interface EvaluatedScreen {
  _id: string;
  header: string;
  main: EvaluatedMainContentProps;
  choiceInformation: ChoiceInfo;
}

export type EvaluatedMainContentProps = (string | PictureMain)[];

export function isEvaluatedMainContentProps(
  main: MainContentProps
): main is EvaluatedMainContentProps {
  return (main as EvaluatedMainContentProps).every(
    (line) => typeof line === "string" || isPictureMain(line)
  );
}

export interface EvaluatedChoiceInfo {
  text: string;
  options: EvaluatedChoiceOption[];
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
