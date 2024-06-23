import { Router } from "express";
import { LoadService } from "../../../../server/LoadService";

const gameRouter = Router();

gameRouter.post(
  "/",
  validationMiddleware.createGame,
  async (req, res, next) => {
    console.log("passed validation");
  }
);

gameRouter.get("/:gameId", async (req, res, next) => {
  const game = await LoadService.getGame(req.params.gameId);
  res.json(game);
});

export { gameRouter };
