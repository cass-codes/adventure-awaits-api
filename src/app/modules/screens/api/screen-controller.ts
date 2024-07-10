import { Response } from "express";
import { ScreenService } from "../service/screen-service";
import { GetScreenDTO } from "./validation";
import { GameService } from "../../games/service/game-service";
import { GameRepository } from "../../games/data-access/game-repository";

const gameRepository = new GameRepository();
const gameService = new GameService(gameRepository);

export async function getScreenById(req: GetScreenDTO, res: Response) {
  try {
    const screenId = req.params.screenId;
    const { gameId, userId } = req.query;
    let game = await gameService.getGame(gameId, userId);
    const screen = await ScreenService.getScreenById(screenId);
    const { saveValues } = req.body;
    if (saveValues) {
      game = await gameService.saveScreenValues(game, saveValues);
    }
    const evaluatedScreen = await ScreenService.evaluateScreen(
      screen,
      gameId,
      userId
    );
    res.json({ screen: evaluatedScreen, game });
  } catch (error) {
    res.status(404).send(error);
  }
}
