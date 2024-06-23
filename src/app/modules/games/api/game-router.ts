import { Request, Router } from "express";
import { LoadService } from "../../../../server/LoadService";
import { validationFactory } from "../../shared/middleware/ajv-validation";
import createGameSchema from "./validation/create-game-schema";

const gameRouter = Router();

gameRouter.post(
  "/",
  validationFactory(createGameSchema),
  async (req: Request, res, next) => {
    console.log("passed validation");
  }
);

gameRouter.get("/:gameId", async (req, res, next) => {
  const game = await LoadService.getGame(req.params.gameId);
  res.json(game);
});

export { gameRouter };
