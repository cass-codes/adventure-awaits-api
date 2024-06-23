import { GameRepository } from "../data-access/game-repository";
import { NewGame } from "./types";

export class GameService {
  gameRepository: GameRepository;

  constructor(dbGameRepository: GameRepository) {
    this.gameRepository = dbGameRepository;
  }

  async createGame(game: NewGame) {
    const result = await this.gameRepository.insertGame(game);
    return result;
  }
}
