import { GameCreationProps } from "../../service/types";
import { CreateGameDto } from "../validation/create-game-schema";

// This function is also setting the defaults
export function convertDtoToNewGame(dto: CreateGameDto): GameCreationProps {
  return {
    userId: dto.userId,
    ...(dto.day ? { day: dto.day } : { day: 0 }),
    screenId: dto.screenId ? dto.screenId : "0",
    quests: [],
    character: {
      name: dto.character?.characterName,
      class: dto.character?.class,
      stats: {
        goodness: dto.character?.stats?.goodness || 0,
        sneakiness: dto.character?.stats?.sneakiness || 0,
        cleverness: dto.character?.stats?.cleverness || 0,
        brawn: dto.character?.stats?.brawn || 0,
        magic: dto.character?.stats?.magic || 0,
        charm: dto.character?.stats?.charm || 0,
      },
      money: {
        gold: dto.character?.money?.gold || 10,
        pennies: dto.character?.money?.pennies || 0,
      },
    },
  };
}
