import { Router } from "express";
import { validationFactory } from "../../shared/middleware";
import {
  createGameSchema,
  getGameSchema,
  getGamesSchema,
  updateGameSchema,
} from "./validation";
import {
  createNewGame,
  deleteGame,
  getGame,
  getGames,
  updateGame,
} from "./game-controller";

const gameRouter = Router();

gameRouter.post("/", validationFactory(createGameSchema), createNewGame);

gameRouter.get("/", validationFactory(getGamesSchema), getGames);

gameRouter.get("/:gameId", validationFactory(getGameSchema), getGame);

gameRouter.patch("/:gameId", validationFactory(updateGameSchema), updateGame);

gameRouter.delete("/:gameId", validationFactory(getGameSchema), deleteGame);

export { gameRouter };
