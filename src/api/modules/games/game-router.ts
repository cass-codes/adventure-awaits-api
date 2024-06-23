import { Router } from "express";
import { LoadService } from "../../../server/LoadService";

const gameRouter = Router();

gameRouter.get("/:gameId", async (req, res, next) => {
  const game = await LoadService.getGame(req.params.gameId);
  res.json(game);
});

export { gameRouter };
