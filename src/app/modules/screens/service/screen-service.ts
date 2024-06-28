import {
  ChoiceOption,
  EvaluatedChoiceOption,
  EvaluatedMainContentProps,
  EvaluatedScreen,
  MainContentProps,
  PictureMain,
  Screen,
  isEvaluatedChoiceOption,
  isEvaluatedMainContentProps,
} from "../../../../shared/types/Screen";
import { screens } from "../../../../data/data/screens";
import { GameService } from "../../games/service/game-service";
import { GameRepository } from "../../games/data-access/game-repository";
import { ScreenFunction, isScreenFunction } from "./types";
import { Game } from "../../games/service/types";

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
  ): Promise<EvaluatedScreen> {
    const game = await new GameService(new GameRepository()).getGame(
      gameId,
      userId
    );
    const screen = { ..._screen };
    const main = this.evaluateMainContent(screen.main, game);
    const options = this.evaluateOptions(
      screen.choiceInformation.options,
      game
    );

    return {
      ...screen,
      main,
      choiceInformation: {
        ...screen.choiceInformation,
        options,
      },
    };
  }

  static evaluateMainContent(
    main: MainContentProps | EvaluatedMainContentProps,
    game: Game
  ): EvaluatedMainContentProps {
    if (isEvaluatedMainContentProps(main)) {
      return main;
    }
    return main.map((content) => {
      if (isScreenFunction(content)) {
        return content(game) as PictureMain | string;
      }
      return content;
    });
  }

  static evaluateOptions(
    _options: ChoiceOption[] | ScreenFunction,
    game: Game
  ): EvaluatedChoiceOption[] {
    const options = isScreenFunction(_options) ? _options(game) : _options;
    if (Array.isArray(options)) {
      return options.map((option) => {
        return this.evaluateOption(option as ChoiceOption, game);
      });
    }
    throw new Error("Options are not evaluated, this should never happen");
  }

  static evaluateOption(
    _option: ChoiceOption,
    game: Game
  ): EvaluatedChoiceOption {
    const option = isScreenFunction(_option)
      ? (_option(game) as EvaluatedChoiceOption)
      : _option;

    if (isEvaluatedChoiceOption(option)) {
      const screenId = isScreenFunction(option.screenId)
        ? option.screenId(game)
        : option.screenId;
      if (typeof screenId === "string") {
        return { ...option, screenId };
      }
    }
    throw new Error("Option is not evaluated, this should never happen");
  }
}
