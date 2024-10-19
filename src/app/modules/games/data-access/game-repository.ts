import { GameModel } from "./game-model";
import { convertDBObjectToGame } from "./converters/convertDBObjectToGame";
import {
  Game,
  GameCreationProps,
  GameDocument,
  UpdateGame,
} from "../service/types";
import { Types } from "mongoose";

export class GameRepository {
  async insertGame(newGame: GameCreationProps): Promise<Game> {
    const res = await GameModel.create<GameDocument>({
      ...newGame,
      _id: new Types.ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return convertDBObjectToGame(res);
  }

  async updateGame(gameId: string, game: UpdateGame): Promise<Game> {
    const updatedGame = await GameModel.findOneAndUpdate<GameDocument>(
      { _id: gameId },
      { $set: { ...game, updatedAt: new Date() } },
      { returnDocument: "after" }
    );
    if (!updatedGame) {
      throw new Error("Game not found");
    }
    return convertDBObjectToGame(updatedGame);
  }

  async getGame(gameId: string): Promise<Game> {
    const game = await GameModel.findById<GameDocument>(gameId);
    if (!game) {
      throw new Error("Game not found");
    }
    return convertDBObjectToGame(game);
  }

  async getGames(userId: string): Promise<Game[]> {
    const games = await GameModel.find<GameDocument>({ userId });
    return games.map(convertDBObjectToGame);
  }

  async deleteGame(gameId: string): Promise<void> {
    await GameModel.findByIdAndDelete(gameId);
  }
}
