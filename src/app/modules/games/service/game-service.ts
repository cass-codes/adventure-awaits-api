import { GameRepository } from "../data-access/game-repository";
import { Game, GameCreationProps, UpdateGame } from "./types";

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
}
