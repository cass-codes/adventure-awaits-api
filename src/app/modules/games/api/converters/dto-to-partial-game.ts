import type { UpdateGame } from "../../service/types";
import type { UpdateGameDto } from "../validation";

export function convertDtoToPartialGame(dto: UpdateGameDto): UpdateGame {
  return {
    ...(dto.day ? { day: dto.day } : {}),
    ...(dto.screen ? { screenId: dto.screen } : {}),
    ...(dto.character
      ? {
          character: {
            ...(dto.character?.stats
              ? {
                  stats: {
                    ...(dto.character?.stats?.goodness
                      ? { goodness: dto.character.stats.goodness }
                      : {}),
                    ...(dto.character?.stats?.cleverness
                      ? { cleverness: dto.character.stats.cleverness }
                      : {}),
                    ...(dto.character?.stats?.sneakiness
                      ? { sneakiness: dto.character.stats.sneakiness }
                      : {}),
                    ...(dto.character?.stats?.brawn
                      ? { brawn: dto.character.stats.brawn }
                      : {}),
                    ...(dto.character?.stats?.magic
                      ? { magic: dto.character.stats.magic }
                      : {}),
                    ...(dto.character?.stats?.charm
                      ? { charm: dto.character.stats.charm }
                      : {}),
                  },
                }
              : {}),
            ...(dto.character?.money
              ? {
                  money: {
                    gold: dto.character.money.gold,
                    pennies: dto.character.money.pennies,
                  },
                }
              : {}),
            ...(dto.character?.relationships
              ? { relationships: dto.character.relationships }
              : {}),
          },
        }
      : {}),
  };
}
