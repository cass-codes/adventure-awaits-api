import { Types } from "mongoose";
import { GameModel } from "./game-model";
import { Character } from "../../../../shared/types/Character";
import { convertDBObjectToGame } from "./converters/convertDBObjectToGame";
import { Game, NewGame } from "../service/types";
import { DbGame } from "./types";

export class GameRepository {
  async insertGame(newGame: NewGame): Promise<Game> {
    const game: DbGame = {
      ...newGame,
      _id: new Types.ObjectId(),
      quests: [],
      inventory: [],
      relationships: {},
    };
    const res = await GameModel.create<DbGame>(game);
    return convertDBObjectToGame(res);
  }

  async updateGame(gameId: string, character: Character, screenId: string) {
    // const game: Omit<Game, "_id"> = {
    //   screen: screenId,
    //   character: character,
    // };
    // const madeGame = await GameModel.findByIdAndUpdate(gameId, game);
    // return madeGame;
  }

  static async getGame(gameId: string): Promise<Game> {
    const game = await GameModel.findById(gameId);
    if (!game) {
      throw new Error("Game not found");
    }
    return convertDBObjectToGame(game);
  }
}
