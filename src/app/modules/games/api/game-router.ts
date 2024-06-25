import { Router } from "express";
import { validationFactory } from "../../shared/middleware";
import {
  createGameSchema,
  getGameSchema,
  updateGameSchema,
} from "./validation";
import { createNewGame, getGame, updateGame } from "./game-controller";

const gameRouter = Router();

gameRouter.post("/", validationFactory(createGameSchema), createNewGame);

gameRouter.get("/:gameId", validationFactory(getGameSchema), getGame);

gameRouter.patch("/:gameId", validationFactory(updateGameSchema), updateGame);

export { gameRouter };
