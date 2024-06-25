import { Game, GameDocument } from "../../service/types";

export function convertDBObjectToGame(game: GameDocument): Game {
  return {
    _id: game._id.toString(),
    userId: game.userId,
    screenId: game.screenId,
    day: game.day,
    character: game.character,
    quests: game.quests ?? [],
  };
}
