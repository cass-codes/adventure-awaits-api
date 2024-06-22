import { Router } from "express";
import { LoadService } from "../server/LoadService";

const userRouter = Router();

userRouter.get("/:gameId", async (req, res, next) => {
  const game = await LoadService.getGame(req.params.gameId);
  res.json(game);
});

export { userRouter };
