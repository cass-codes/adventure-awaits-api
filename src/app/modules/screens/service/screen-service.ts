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
  isPictureMain,
} from "../../../../shared/types/Screen";
import { screens } from "../../../../data/data/screens";
import { GameService } from "../../games/service/game-service";
import { GameRepository } from "../../games/data-access/game-repository";
import { ScreenFunction, isScreenFunction } from "./types";
import { Game } from "../../games/service/types";
import { RelationshipEnum, Stat } from "../../../../shared/types/Character";

export class ScreenService {
  static getScreenById(id: string): Screen {
    const screen = screens.find((screen) => screen._id === id);
    if (!screen) {
      throw new Error(`Screen with id: ${id} not found`);
    }
    return screen;
  }

  static async evaluateScreen(
    screen: Screen,
    gameId: string,
    userId: string
  ): Promise<EvaluatedScreen> {
    const game = await new GameService(new GameRepository()).getGame(
      gameId,
      userId
    );
    const { main, choiceInformation, header, _id } = screen;
    const evalMain = this.evaluateMainContent(main, game);
    const options = this.evaluateOptions(choiceInformation.options, game);

    return {
      _id,
      header: this.unfurlString(header, game),
      main: evalMain,
      choiceInformation: {
        text: this.unfurlString(choiceInformation.text, game),
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
      if (isPictureMain(content)) {
        return {
          ...content,
          alt: this.unfurlString(content.alt, game),
          sideText: content.sideText.map((sideText) =>
            this.unfurlString(sideText, game)
          ),
        };
      }
      return this.unfurlString(content, game);
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

  private static evaluateOption(
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
        return {
          ...option,
          optionText: this.unfurlString(option.optionText, game),
          screenId,
        };
      }
    }
    throw new Error("Option is not evaluated, this should never happen");
  }

  static unfurlString(text: string, game: Game) {
    const parts = text.split("%%{");
    let returnVal = parts[0];
    for (let i = 1; i < parts.length; i++) {
      const objectPath = parts[i].split("}");
      const evaluatedVal = this.getObjectPathString(objectPath[0], game);
      returnVal += evaluatedVal + objectPath[1];
    }
    return returnVal;
  }

  static getObjectPathString(objectPath: string, game: Game) {
    const { ObjectName, propertyPath } = this.parseSavePath(objectPath);
    if (ObjectName === "User") {
      if (propertyPath[0] === "name") {
        return game.character.name;
      }
      if (propertyPath[0] === "class") {
        return game.character.class;
      }
      if (propertyPath[0] === "stats") {
        const stat = Stat[propertyPath[1] as keyof typeof Stat];
        return game.character.stats[stat].toString();
      }
      if (propertyPath[0] === "gold") {
        return game.character.money.gold;
      }
      if (propertyPath[0] === "pennies") {
        return game.character.money.pennies;
      }
      // if (propertyPath[0] === "motivations") {
      //   return user.motivations?.join(", ") || "";
      // }
      if (propertyPath[0] === "relationships") {
        const relationship =
          RelationshipEnum[propertyPath[1] as keyof typeof RelationshipEnum];
        if (game.character.relationships) {
          const rel = game.character.relationships[relationship];
          if (rel) {
            if (propertyPath[2] === "dayMet") {
              return rel.dayMet;
            }
            if (propertyPath[2] === "relationshipValue") {
              return rel.relationshipValue;
            }
          }
        }
      }
      // if (propertyPath[0] === "quests") {
      //   return game.quests[propertyPath[1]].displayText;
      // }
    }
    throw new Error(`Cannot read properties of ${ObjectName}, ${propertyPath}`);
  }

  private static parseSavePath(savePath: string) {
    const pathParts = savePath.split(".");
    const ObjectName: string = pathParts[0];
    const propertyPath: string[] = pathParts.slice(1);
    return { ObjectName, propertyPath };
  }
}
