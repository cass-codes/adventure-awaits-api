import { Types } from "mongoose";
import { Game } from "../shared/types/Game";
import { GameModel } from "./game-model";
import { User } from "../shared/types/User";

export class GameRepository {
  async insertGame(user: User, screenId: string) {
    const game: Game = {
      _id: new Types.ObjectId(),
      screenId,
      characterName: user.name || "",
      class: user.class,
      stats: user.stats,
      money: user.money,
      relationships: user.relationships,
      quests: user.quests,
    };
    const res = await GameModel.create(game);
    return res;
  }

  async updateGame(gameId: string, user: User, screenId: string) {
    const game: Omit<Game, "_id"> = {
      screenId,
      characterName: user.name || "",
      class: user.class,
      stats: user.stats,
      money: user.money,
      relationships: user.relationships,
      quests: user.quests,
    };

    console.log("gameId", gameId);
    console.log("game", game);

    const madeGame = await GameModel.findByIdAndUpdate(gameId, game);
    return madeGame;
  }

  async getGame(gameId: string) {
    const game = await GameModel.findById(gameId);
    return game;
  }
}
