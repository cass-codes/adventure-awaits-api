import { evalPlusMinusInput, parseSavePath } from "../../../../server/helper";
import {
  RelationshipEnum,
  UserClass,
} from "../../../../shared/types/Character";
import { GameRepository } from "../data-access/game-repository";
import { Game, GameCreationProps, SaveValues, UpdateGame } from "./types";

export class GameService {
  gameRepository: GameRepository;

  constructor(dbGameRepository: GameRepository) {
    this.gameRepository = dbGameRepository;
  }

  async createGame(game: GameCreationProps): Promise<Game> {
    const result = await this.gameRepository.insertGame(game);
    return result;
  }

  async getGame(gameId: string, userId: string): Promise<Game> {
    const game = await this.gameRepository.getGame(gameId);
    if (game.userId && game.userId !== userId) {
      // TODO once userId is required update this check
      throw new Error("Unauthorized");
    }
    return game;
  }

  async updateGame(gameId: string, game: UpdateGame): Promise<Game> {
    const result = await this.gameRepository.updateGame(gameId, game);
    return result;
  }

  async getGames(userId: string): Promise<Game[]> {
    const games = await this.gameRepository.getGames(userId);
    return games;
  }

  async deleteGame(gameId: string, userId: string): Promise<void> {
    const gameToDelete = await this.getGame(gameId, userId);
    await this.gameRepository.deleteGame(gameToDelete._id);
  }

  async saveScreenValues(
    gameId: string,
    userId: string,
    saveValues: SaveValues[]
  ) {
    const gameToUpdate: Game = await this.getGame(gameId, userId);
    saveValues.forEach(({ savePath, saveValue }) => {
      this.saveContent(gameToUpdate, savePath, saveValue);
    });
    await this.updateGame(gameId, gameToUpdate);
  }

  private saveContent(game: Game, input: string, savePath: string) {
    const { ObjectName, propertyPath } = parseSavePath(savePath);
    if (ObjectName === "User") {
      if (propertyPath[0] === "name") {
        game.character.name = input;
      } else if (propertyPath[0] === "class") {
        game.character.class = input as UserClass;
      } else if (propertyPath[0] === "stats") {
        const statName = propertyPath[1] as keyof Game["character"]["stats"];
        game.character.stats[statName] = parseFloat(input);
      } else if (propertyPath[0] === "gold") {
        game.character.money.gold = parseFloat(input);
      } else if (propertyPath[0] === "pennies") {
        game.character.money.pennies = parseFloat(input);
        // } else if (propertyPath[0] === "motivations") {
        //   updateMotivations(game, input);
      } else if (propertyPath[0] === "relationships") {
        this.updateRelationship(game, input, propertyPath[1]);
      } else if (propertyPath[0] === "quests") {
        // TODO Handle quests
        // updateQuest(game, input, propertyPath[1], propertyPath[2] || undefined);
        // } else if (propertyPath[0] === "skills") {
        //   updateSkills(game, input);
        // } else if (propertyPath[0] === "tavern") {
        //   setTavern(game, input);
      } else {
        throw Error(`Property not found: ${propertyPath[0]}`);
      }
    } else {
      throw Error(`Object not found ${ObjectName}`);
    }
  }

  private updateRelationship(game: Game, value: string, _relationship: string) {
    const relationship = RelationshipEnum[_relationship as RelationshipEnum];
    if (!game.character.relationships) {
      game.character.relationships = {};
    }
    let rel = game.character.relationships[relationship];
    if (rel === undefined) {
      rel = { dayMet: game.day, relationshipValue: 0 };
    }
    rel.relationshipValue += evalPlusMinusInput(value);
    game.character.relationships[relationship] = rel;
  }
}
