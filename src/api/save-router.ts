import { Router } from "express";
import { SavingService } from "../server/SavingService";
import { GameRepository } from "../data-access/game-repository";

const saveRouter = Router();

const gameRepository = new GameRepository();
const savingService = new SavingService(gameRepository);

saveRouter.post("/", async (req, res, next) => {
  const { screenId, gameId } = req.body;
  const id = await savingService.saveGame(gameId, screenId);
  res.json(id);
});

saveRouter.post("/content", (req, res, next) => {
  const { value, objectPath } = req.body;
  console.log(req.body);
  const user = SavingService.saveContent(value, objectPath);
  res.json(user);
});

export { saveRouter };
