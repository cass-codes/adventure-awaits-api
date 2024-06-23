import { Request, Response, Router } from "express";
import { LoadService } from "../../../../server/LoadService";
import { validationFactory } from "../../shared/middleware";
import { createGameSchema } from "./validation/create-game-schema";

const gameRouter = Router();

gameRouter.post(
  "/",
  validationFactory(createGameSchema),
  async (req: Request, res: Response) => {
    console.log("passed validation");
    res.sendStatus(501); // Full route not yet implemented
  }
);

gameRouter.get("/:gameId", async (req, res, next) => {
  const game = await LoadService.getGame(req.params.gameId);
  res.json(game);
});

export { gameRouter };
