import { Router } from "express";
import { LoadService } from "../../../../server/LoadService";
import { validationFactory } from "../../shared/middleware";
import { createGameSchema } from "./validation/create-game-schema";
import { createNewGame } from "./game-controller";

const gameRouter = Router();

gameRouter.post("/", validationFactory(createGameSchema), createNewGame);

gameRouter.get("/:gameId", async (req, res) => {
  const game = await LoadService.getGame(req.params.gameId);
  res.json(game);
});

export { gameRouter };
