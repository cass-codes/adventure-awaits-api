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

  static getScreensByIds(ids: string[]): Screen[] {
    return ids.map((id) => ScreenService.getScreenById(id));
  }

  static evaluateScreen(_screen: Screen): Screen {
    const screen = { ..._screen };
    const main = screen.main.map((_line) => {
      return _line instanceof Function ? _line() : _line;
    });
    const _options =
      screen.choiceInformation.options instanceof Function
        ? screen.choiceInformation.options()
        : screen.choiceInformation.options;
    const options = _options.map((_option: ChoiceOption) => {
      const option: EvaluatedChoiceOption =
        _option instanceof Function ? _option() : _option;
      const screenId =
        option.screenId instanceof Function
          ? option.screenId()
          : option.screenId;
      return { ...option, screenId };
    });

    return {
      ...screen,
      main,
      choiceInformation: { ...screen.choiceInformation, options },
    };
  }
}
