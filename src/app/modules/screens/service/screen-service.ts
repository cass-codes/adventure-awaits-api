import {
  ChoiceOption,
  EvaluatedChoiceOption,
  Screen,
} from "../../../../shared/types/Screen";
import { screens } from "../../../../data/data/screens";
import { GameService } from "../../games/service/game-service";
import { GameRepository } from "../../games/data-access/game-repository";
import { isScreenFunction } from "./types";

export class ScreenService {
  static getScreenById(id: string): Screen {
    const screen = screens.find((screen) => screen._id === id);
    if (!screen) {
      throw new Error(`Screen with id: ${id} not found`);
    }
    return screen;
  }

  static async evaluateScreen(
    _screen: Screen,
    gameId: string,
    userId: string
  ): Promise<Screen> {
    const game = await new GameService(new GameRepository()).getGame(
      gameId,
      userId
    );
    const screen = { ..._screen };
    const main = screen.main.map((_line) => {
      return isScreenFunction(_line) ? _line(game) : _line;
    });
    const _options = isScreenFunction(screen.choiceInformation.options)
      ? screen.choiceInformation.options(game)
      : screen.choiceInformation.options;
    const options = _options.map((_option: ChoiceOption) => {
      const option: EvaluatedChoiceOption = isScreenFunction(_option)
        ? _option(game)
        : _option;
      const screenId = isScreenFunction(option.screenId)
        ? option.screenId(game)
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
