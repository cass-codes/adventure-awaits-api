import {
  ChoiceOption,
  EvaluatedChoiceOption,
  Screen,
} from "../../../../shared/types/Screen";
import { screens } from "../../../../data/data/screens";
import { GameService } from "../../games/service/game-service";
import { GameRepository } from "../../games/data-access/game-repository";

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static evaluateScreen(
    _screen: Screen,
    gameId: string,
    userId: string
  ): Screen {
    const game = new GameService(new GameRepository()).getGame(gameId, userId);
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
