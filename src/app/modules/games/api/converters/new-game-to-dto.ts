import { Game } from "../../service/types";
import { CreatedGameDto } from "../response-dtos";

export function convertGameToCreateResponse(game: Game): CreatedGameDto {
  return {
    id: game._id,
  };
}
