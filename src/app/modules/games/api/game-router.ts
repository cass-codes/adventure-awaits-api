import { Router } from "express";
import { validationFactory } from "../../shared/middleware";
import {
  createGameSchema,
  getGameSchema,
  updateGameSchema,
} from "./validation";
import { createNewGame, getGame } from "./game-controller";

const gameRouter = Router();

gameRouter.post("/", validationFactory(createGameSchema), createNewGame);

gameRouter.get("/:gameId", validationFactory(getGameSchema), getGame);

gameRouter.put("/:gameId", validationFactory(updateGameSchema), (req, res) => {
  console.log("passed validation");
  res.sendStatus(501);
});

export { gameRouter };
