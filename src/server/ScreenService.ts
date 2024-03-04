import {
  ChoiceOption,
  EvaluatedChoiceOption,
  Screen,
} from "../shared/types/Screen";
import { screens } from "../data/data/screens";

export class ScreenService {
  static getScreenById(id: string): Screen {
    const screen = screens.find((screen) => screen._id === id);
    if (!screen) {
      throw new Error(`Screen with id: ${id} not found`);
    }
    return screen;
  }

  static getScreenIdsByParentId(parentId: string): string[] {
    const parentScreen = ScreenService.getScreenById(parentId);
    const options =
      parentScreen.choiceInformation.options instanceof Function
        ? parentScreen.choiceInformation.options()
        : parentScreen.choiceInformation.options;

    const ids: string[] = [];

    options.forEach((_option: ChoiceOption[] | Function) => {
      const option: EvaluatedChoiceOption =
        typeof _option === "function" ? _option() : _option;

      const screenId =
        option.screenId instanceof Function
          ? option.screenId()
          : option.screenId;
      ids.push(screenId);
    });

    return ids;
  }

  static getScreensByIds(ids: string[]): Screen[] {
    return ids.map((id) => ScreenService.getScreenById(id));
  }
}
