import { Router } from "express";
import { validationFactory } from "../../shared/middleware";
import { createGameSchema, getGameSchema } from "./validation";
import { createNewGame } from "./game-controller";

const gameRouter = Router();

gameRouter.post("/", validationFactory(createGameSchema), createNewGame);

gameRouter.get(
  "/:gameId",
  validationFactory(getGameSchema),
  async (req, res) => {
    console.log("passed validation");
    res.sendStatus(501);
  }
);

export { gameRouter };
