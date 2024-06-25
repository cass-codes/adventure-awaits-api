import { GameRepository } from "../data-access/game-repository";
import { GameCreationProps, UpdateGame } from "./types";

export class GameService {
  gameRepository: GameRepository;

  constructor(dbGameRepository: GameRepository) {
    this.gameRepository = dbGameRepository;
  }

  async createGame(game: GameCreationProps) {
    const result = await this.gameRepository.insertGame(game);
    return result;
  }

  async getGame(gameId: string, userId: string) {
    const game = await this.gameRepository.getGame(gameId);
    if (game.userId && game.userId !== userId) {
      // TODO once userId is required update this check
      throw new Error("Unauthorized");
    }
    return game;
  }

  async updateGame(gameId: string, game: UpdateGame) {
    const result = await this.gameRepository.updateGame(gameId, game);
    return result;
  }
}
