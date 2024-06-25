import { GameModel } from "./game-model";
import { convertDBObjectToGame } from "./converters/convertDBObjectToGame";
import { Game, GameCreationProps, UpdateGame } from "../service/types";

export class GameRepository {
  async insertGame(newGame: GameCreationProps): Promise<Game> {
    const res = await GameModel.create<GameCreationProps>(newGame);
    return convertDBObjectToGame(res);
  }

  async updateGame(gameId: string, game: UpdateGame): Promise<Game> {
    const updatedGame = await GameModel.findOneAndUpdate(
      { _id: gameId },
      { $set: game },
      { returnDocument: "after" }
    );
    if (!updatedGame) {
      throw new Error("Game not found");
    }
    return convertDBObjectToGame(updatedGame);
  }

  async getGame(gameId: string): Promise<Game> {
    const game = await GameModel.findById(gameId);
    if (!game) {
      throw new Error("Game not found");
    }
    return convertDBObjectToGame(game);
  }
}
