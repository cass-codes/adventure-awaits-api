import { Game } from "../../service/types";
import { DbGame } from "../types";

export function convertDBObjectToGame(game: DbGame): Game {
  return {
    _id: game._id.toString(),
    screenId: game.screenId,
    day: game.day,
    character: game.character,
    quests: game.quests ?? [],
    inventory: game.inventory ?? [],
    relationships: game.relationships ?? {},
  };
}
