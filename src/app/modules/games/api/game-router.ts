import { Router } from "express";
import { validationFactory } from "../../shared/middleware";
import { createGameSchema, getGameSchema } from "./validation";
import { createNewGame, getGame } from "./game-controller";

const gameRouter = Router();

gameRouter.post("/", validationFactory(createGameSchema), createNewGame);

gameRouter.get("/:gameId", validationFactory(getGameSchema), getGame);

export { gameRouter };
