import { GameRepository } from "../data-access/game-repository";
import { Game } from "../shared/types/Game";
import { getUser } from "./user";

export class LoadService {
  static loadUser() {
    return getUser();
  }
  static async getGame(gameId: string): Promise<Game> {
    const game = await GameRepository.getGame(gameId);
    return game;
  }
}
