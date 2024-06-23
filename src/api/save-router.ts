import { Router } from "express";
import { SavingService } from "../server/SavingService";
import { GameRepository } from "./modules/games/data-access/game-repository";
import { Character } from "../shared/types/Character";

const saveRouter = Router();

const gameRepository = new GameRepository();
const savingService = new SavingService(gameRepository);

saveRouter.post("/", async (req, res) => {
  const { screenId, gameId } = req.body;
  console.log("req.body", req.body);
  const id = await savingService.saveGame(gameId, screenId);
  console.log("id", id);
  res.json(id);
});

saveRouter.post("/:gameId", (req, res) => {
  const { value, objectPath, screenId } = req.body;
  const { gameId } = req.params;

  const game = SavingService.loadGame(gameId);
  if (!game) {
    res.status(404).json({ message: "Game not found" });
  }
  const user: Character = SavingService.saveContent(value, objectPath);
  savingService.updateGame(gameId, user, screenId);
  console.log("user", user);
  res.json(user);
});

export { saveRouter };
