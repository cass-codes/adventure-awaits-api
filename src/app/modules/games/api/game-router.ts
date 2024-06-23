import { Router } from "express";
import { LoadService } from "../../../../server/LoadService";
import createGameValidator from "./validation/create-game-schema";

const gameRouter = Router();

gameRouter.post("/", createGameValidator, async (req, res, next) => {
  console.log("passed validation");
});

gameRouter.get("/:gameId", async (req, res, next) => {
  const game = await LoadService.getGame(req.params.gameId);
  res.json(game);
});

export { gameRouter };
