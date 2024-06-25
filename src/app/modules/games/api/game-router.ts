import { Router } from "express";
import { validationFactory } from "../../shared/middleware";
import {
  createGameSchema,
  getGameSchema,
  getGamesSchema,
  updateGameSchema,
} from "./validation";
import { createNewGame, getGame, updateGame } from "./game-controller";

const gameRouter = Router();

gameRouter.post("/", validationFactory(createGameSchema), createNewGame);

gameRouter.get("/", validationFactory(getGamesSchema), (req, res) => {
  res.send("passed validation");
});

gameRouter.get("/:gameId", validationFactory(getGameSchema), getGame);

gameRouter.patch("/:gameId", validationFactory(updateGameSchema), updateGame);

export { gameRouter };
