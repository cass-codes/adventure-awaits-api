import { GameRepository } from "../app/modules/games/data-access/game-repository";
import { Game } from "../app/modules/games/service/types";
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
