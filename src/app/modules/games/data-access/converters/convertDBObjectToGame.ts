import { Game, GameDocument } from "../../service/types";

export function convertDBObjectToGame(game: GameDocument): Game {
  return {
    _id: game._id.toString(),
    userId: game.userId,
    screenId: game.screenId,
    day: game.day,
    character: {
      name: game.character.name,
      class: game.character.class,
      stats: {
        goodness: game.character.stats.goodness,
        sneakiness: game.character.stats.sneakiness,
        cleverness: game.character.stats.cleverness,
        brawn: game.character.stats.brawn,
        magic: game.character.stats.magic,
        charm: game.character.stats.charm,
      },
      money: {
        gold: game.character.money.gold,
        pennies: game.character.money.pennies,
      },
      relationships: game.character.relationships,
      motivations: game.character.motivations,
    },
    quests: game.quests ?? [],
  };
}
