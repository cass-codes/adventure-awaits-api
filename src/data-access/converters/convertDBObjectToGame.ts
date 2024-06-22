import { Game } from "../../shared/types/Game";

export function convertDBObjectToGame(game: any): Game {
  return {
    _id: game._id,
    screenId: game.screenId,
    characterId: game.characterId,
  };
}
