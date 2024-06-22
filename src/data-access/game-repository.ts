import { Types } from "mongoose";
import { Game } from "../shared/types/Game";
import { GameModel } from "./game-model";
import { Character } from "../shared/types/Character";
import { convertDBObjectToGame } from "./converters/convertDBObjectToGame";

export class GameRepository {
  async insertGame(character: Character, screenId: string) {
    const game: Game = {
      _id: new Types.ObjectId(),
      screenId,
      characterId: character._id,
    };
    const res = await GameModel.create(game);
    return res;
  }

  async updateGame(gameId: string, character: Character, screenId: string) {
    const game: Omit<Game, "_id"> = {
      screenId,
      characterId: character._id,
    };

    const madeGame = await GameModel.findByIdAndUpdate(gameId, game);
    return madeGame;
  }

  static async getGame(gameId: string): Promise<Game> {
    const game = await GameModel.findById(gameId);
    if (!game) {
      throw new Error("Game not found");
    }
    return convertDBObjectToGame(game);
  }
}
