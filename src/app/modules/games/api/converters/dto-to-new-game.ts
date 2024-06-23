import { NewGame } from "../../service/types";
import { CreateGameDto } from "../validation/create-game-schema";

export function convertDtoToNewGame(dto: CreateGameDto): NewGame {
  return {
    userId: dto.userId,
    day: dto.day,
    screenId: dto.screen,
    character: {
      name: dto.character.characterName,
      class: dto.character.class,
      stats: {
        goodness: dto.character.stats.goodness,
        sneakiness: dto.character.stats.sneakiness,
        cleverness: dto.character.stats.cleverness,
        brawn: dto.character.stats.brawn,
        magic: dto.character.stats.magic,
        charm: dto.character.stats.charm,
      },
      money: {
        gold: dto.character.money.gold,
        pennies: dto.character.money.pennies,
      },
    },
  };
}
